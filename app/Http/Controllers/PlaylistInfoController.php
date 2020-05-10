<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PlaylistInfoController extends Controller
{
    //

    public function genres(Request $request){

        $arr = collect($request->input('genres'));

        $arr = $arr->collapse();

        $arr = $arr->toArray();

        $arr = array_count_values( $arr);

        asort($arr);
        foreach ($arr as $key => $value){
            $collection[] = ucwords($key).':'.$value;
        }

        return $collection;
    }

}
