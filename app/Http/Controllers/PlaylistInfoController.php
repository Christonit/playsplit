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

        $arr = collect($arr)->sortDesc();

        return $arr;
    }

}
