import {mapState, mapMutations, mapGetters} from 'vuex';
import {songMstoSeconds} from './lib.js';

export default {
    data() {
      return {
          apiROOT: "https://api.spotify.com"
      };
    },
    computed: {            
      ...mapState(['user','isUserLoaded','isSDKLoaded','activePlaylist','passed_time','passed_time_ms']),
      ...mapGetters(['authorization']),
      header_GET(){
            return {
                method: 'GET',
                headers:{
                    Authorization:`Bearer ${this.$store.state.user.access_token}`
                }
            }
        }
        
    },
  
    created() {

      let promise = new Promise( (resolve,reject) => {
        let timer =  setInterval(()=>{
             if( this.isUserLoaded == true && this.user !== '' && this.isSDKLoaded == true){
                 // this.setPlayer();

                 resolve('User info is loaded');
                 clearInterval(timer)
             }
         },10);

     }).then(() => this.getPlaylists(this.user.spotify_id))
     .then(() => this.setPlayer())
     .then(() => this.player.connect())
     .then(() => this.setPlayerId())      


    
    },
    mounted(){
      
    },
  
    methods: {
      ...mapMutations(['setPassedTimeMs', 'setPassedTime']),
      getPlaylistInfo(playlist_id){
        return fetch(`${this.apiROOT}/v1/playlists/${playlist_id}`, this.header_GET).then( response => {
          if(response.status == 200){
            return response.text()
          }
            
        }).then(data => {

            let payload = JSON.parse(data);
            return payload;

        })

      },
    
      getPlaylists(user_id){
        return fetch(`${this.apiROOT}/v1/users/${user_id}/playlists`,this.header_GET).then( response => {
              if(response.status == 200){
                return response.text()
              }
                
          }).then(data => {

              let payload = JSON.parse(data);
              this.$store.commit('setPlaylists',payload.items)
              console.log('Playlists loaded')

          })
      },
      playSong(uri){
        if(this.activePlaylist == false){ 
          
          fetch('https://api.spotify.com/v1/me/player/play?device_id='+this.$store.state.device_id,{
              method: 'PUT',
              headers: this.authorization,
              body:JSON.stringify({uris: [uri]})
            })
            .then( (res)=> this.$store.commit('setPlaylistPlaying', true) )

          }else{

          this.player.togglePlay()

        }
                              
                            
      },
      playTrack(){
        if(activePlaylist == false){
            this.player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });
        }
        
    },
    setPlayer(){
        const token = this.user.access_token;
        this.player = new Spotify.Player({
            name: 'Playsplit',
            getOAuthToken: cb => { cb(token); },
            volume:0.9
        });

        this.$store.dispatch('setPlayer',this.player)

        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        this.player.addListener('player_state_changed', state => { 
          
          if(state != null){

            let { 
                current_track,
                next_tracks 
              } = state.track_window;

            let {
              position
            } = state
              
              this.$store.commit('setCurrentPlayback',{ position ,current_track,next_tracks})

            }

        
        });




    },
    setPlayerId(){
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.$store.commit('setDeviceId', device_id);
            this.isSpotifyOnline = true;
            
        });
    },
    setTime(tracked = 0, pressed = false){

      let interval = setInterval( ()=>{
          console.log('timer')
          let time = 0;
          if( this.passed_time_ms >= tracked  || pressed == true  ){

              this.setPassedTimeMs(0)
              this.setPassedTime(0) 
              
              return clearInterval(interval)

          }
          if(this.isPlayPaused == true){

              return clearInterval(interval)

          }
          
            time += 1000 
            this.setPassedTimeMs(time)
            this.setPassedTime( songMstoSeconds(this.passed_time_ms)  )  

        },1000)

    }

    }
    
  };
  