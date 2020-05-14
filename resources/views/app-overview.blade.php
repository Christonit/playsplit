@extends('layouts.app')

@section('content')
    <top-nav></top-nav>
    <sidebar-comp></sidebar-comp>
    <div class="app-container">

        <playlist-dashboard  :get-playlist-info='getPlaylistInfo'></playlist-dashboard>
        <split-overview  v-if="split.isActive"></split-overview>
        <playlist-detail  v-if="detailPlaylist.isActive"></playlist-detail>
        
    </div>
    <stats-table></stats-table>
    <quickmerge v-if="mergeActive"></quickmerge>
    <playback-controller></playback-controller>

    <edit-name-pop-up v-if="isModalOpen" commit-name="setMergeName"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_1" :emition="true"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_2" :emition="true"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_3" :emition="true"></edit-name-pop-up>
    
    <div class="flex-center position-ref full-height">

            <div class="content">
                <div class="title m-b-md">
                    Laravel

                    @if(Auth::check())

                      

                        <!-- {{$user}} -->
                    @endif
                </div>


                @if(Auth::check())

                <p> {{$user->spotify_email}}</p>

                    <a href="/auth/spotify/logout"> Logout</a>
                
                @else
                    
                    <a href="{{route('spotify')}}"> Log in</a>

                @endif

                <div class="links">
                    <a href="https://laravel.com/docs">Docs</a>
                    <a href="https://laracasts.com">Laracasts</a>
                    <a href="https://laravel-news.com">News</a>
                    <a href="https://blog.laravel.com">Blog</a>
                    <a href="https://nova.laravel.com">Nova</a>
                    <a href="https://forge.laravel.com">Forge</a>
                    <a href="https://github.com/laravel/laravel">GitHub</a>
                </div>
            </div>
        </div>

@endsection
