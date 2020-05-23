<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Support\Facades\Http;
use App\User;
use Auth;
use Carbon\Carbon;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    private function auth_base_64(){
        return base64_encode(env('SPOTIFY_CLIENT_ID').':'.env('SPOTIFY_SECRET_ID'));
    }

    public function index()
    {

        if( Auth::check()){

            return view('app-overview'); 
        }
        return view('landing');
    }
    public function callback(Request $request)
    {

        // 3. Save access token
        $access_token =  $request->code;

        // 4.  OPen new client in guzzle to accounts.spotify
        $client = new Client([
            'base_uri' => 'https://accounts.spotify.com'
        ]);

        $redirect_url = 'http://127.0.0.1:8000/auth/spotify/callback';

        $code = base64_encode(env('SPOTIFY_CLIENT_ID').':'.env('SPOTIFY_SECRET_ID'));

        // 5. Send post to Api token to get access token
        $response = $client->request('POST','/api/token',[
            'form_params' => [
                'grant_type' => 'authorization_code',
                'code' => $access_token,
                'redirect_uri' => $redirect_url,
                'client_id'=>env('SPOTIFY_CLIENT_ID'),
                'client_secret'=>env('SPOTIFY_SECRET_ID')
                ]
            ]);


        // 6. encode response in JSON  
        $tokens = json_decode($response->getBody(),true);
        // 7. OPen get request to api spotify to obtain user ID.
        $spotify_user = $this->handleUserInfo($tokens);

        // return $user['email'];
        $user = $this->findOrCreateSpotifyUser($spotify_user);
        
        auth()->login($user);

        return redirect('/');



    }

    public function authSpotify()
    {

        // 1. Set scopes of the privilege you want.
        $scopes = 'streaming user-read-private user-read-email user-read-playback-state playlist-read-collaborative user-modify-playback-state playlist-modify-public playlist-modify-private user-read-currently-playing playlist-read-private';
        $redirect_url = 'http://127.0.0.1:8000/auth/spotify/callback';


        // 2. Send Secret and CLient ID to Spotify server.

        return redirect('https://accounts.spotify.com/authorize'.
                '?response_type=code'.
                '&client_id='.env('SPOTIFY_CLIENT_ID').
                ($scopes ? '&scope='.urlencode($scopes) : '').
                '&redirect_uri='.urlencode($redirect_url));

    }

    protected function handleUserInfo($tokens){
        $user_client = new Client(['base_uri' => 'https://api.spotify.com']);
        
        $user_client = $user_client->request('GET',"/v1/me",
        [
            'headers' => ['Authorization'=> 'Bearer '.$tokens['access_token']]
        ]);
        $spotify_user = json_decode($user_client->getBody(),true);

        $spotify_user['access_token'] = $tokens['access_token'];
        $spotify_user['refresh_token'] = $tokens['refresh_token'];

        return $spotify_user;
    }

    protected function findOrCreateSpotifyUser($spotify){



        
        $user = User::firstOrNew(['spotify_id' => $spotify['id'] ]);

        if( $user->exists){

            $user->access_token = $spotify['access_token'];
            $user->refresh_token = $spotify['refresh_token'];
            $user->save();

            return $user;
        }

        if( !empty($spotify['images']) ){
            
            $prof_pic = $spotify['images'][0]['url'];
        }else{
            $prof_pic = null;
        }

        $user->fill([
            'spotify_id' => $spotify['id'],
            'name' => $spotify['display_name'],
            'spotify_email' => $spotify['email'],
            'avatar' => $prof_pic,
            'account_type' => $spotify['product'],
            'access_token' => $spotify['access_token'],
            'refresh_token' => $spotify['refresh_token']
        ])->save();

        return $user;

    }

    public function authLogout(){
        Auth::logout();

        return redirect('/');
    }

    public function userData(){
        // 1.Fetch logged user
        $user = Auth::user();
        $latest_login = $user['updated_at'];
        // 2. Convert last updated time record to Carbon date format
        $latest_login = Carbon::createFromFormat('Y-m-d H:i:s',$user['updated_at']);

        // 3. Get the current time in carbon
        $right_now =  Carbon::now();

        // 4. Compare how many minutes has passed since last loggin
        $time_left = $right_now->diffInMinutes($latest_login);
        // 5. If it has passed more than 50 minutes
        if( $time_left >= 50){
            // 6. Refresh access token in spotify
            $refresh =  Http::withHeaders(['Authorization'=> 'Basic '.$this->auth_base_64() ])->asForm()->post('https://accounts.spotify.com/api/token',[
                'grant_type' => 'refresh_token',
                'refresh_token' => $user['refresh_token']
            ]);

            $new_token = $refresh->json();
            // 7. saves the new token in database.
            $user->access_token = $new_token['access_token'];
            $user->save();   
            //  8. get updated database records
            $user = Auth::user();
            $time_left = 0;
        }

        // 9. Set expiration time in minutes in the payload
        $user['expiration_time_min'] = 60 - $time_left;


        return $user;
    }
}
