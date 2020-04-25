@extends('layouts.app')

@section('content')
    <top-nav></top-nav>
    <sidebar-comp></sidebar-comp>
    <div class="app-container">

        
        <section id="playlists-list" class='section-container'>
            <div class="section-header">
                <h2 class="title">My playlists</h2>
                <div class="btn-container">
                    <div class="view-type-toggle">
                        <button class="material-icons">view_list</button>
                        <button class="material-icons">view_module</button>
                    </div>
                </div>
                
            </div>

            <div class="section-body">
                <div class="grid-list-item">
                    <div class="grid-list-img">
                        <img src="https://via.placeholder.com/88" alt="Playlist title - cover">
                        <button class="btn-play material-icons">
                            play_arrow
                        </button>
                    </div>
                    <div class="grid-cell">
                        <a href='#' class="grid-list-heading">Hate it or love it</a>
                        <span class="grid-list-text">New age, synthwave, hip hop...</span>
                    </div>


                    <div class="grid-cell">
                        <span class="grid-list-text">172 songs</span>
                    </div>
                    <div class="grid-cell">
                        <span class="grid-list-text">3 hours 25 min</span>
                    </div>

                    <div class="grid-actions-container">
                        <div class="btn-container">
                            <button>merge</button>
                            <button>split</button>
                        </div>
                        <span  class="material-icons btn-options">more_horiz</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <playback-controller></playback-controller>
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
