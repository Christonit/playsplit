@extends('layouts.app')

@section('content')
    <top-nav></top-nav>
    <sidebar-comp></sidebar-comp>
    <div class="app-container">
    <section id="split-playlist" class='action-container'>
        <div class="section-header">
            <h2 class="title">PLaylist de prueba 2</h2> 
            <div class="btn-container d-inline-flex align-items-center">
                <button class=" mx-3 btn btn-secondary">Cancel split</button>
            </div>

            <div class="section-header-description">
                <p class="text">Created by <b class="highlight"> Christopher Santana </b> • 99 tracks • 3hrs 30 min</p>
            </div>            
        </div>

        <div class="split-body">
            <div class="split-original">
                <div class="split-original-header">
                    <span class="split-original-cell">#</span>
                    <span class="split-original-cell">Title</span>
                    <span class="split-original-cell">Duration</span>
                </div>

                <ul class="split-original-body">
                    <li class="split-original-row">
                        <span class="split-original-cell">1</span>
                        <span class="split-original-cell">So Wrong - Jac & Harri and ...</span>
                        <span class="split-original-cell">2:30</span>
                    </li>
                    <li class="split-original-row">
                        <span class="split-original-cell">1</span>
                        <span class="split-original-cell">So Wrong - Jac & Harri and ...</span>
                        <span class="split-original-cell">2:30</span>
                    </li>
                </ul>

                <div class="split-controller">
                    <span class="label">Divide splaylists in</span>
                    <button class="split-btn active">2</button>
                    <button class="split-btn">3</button>
                    <button class="split-btn">4</button>
                </div>

            </div>
           
        </div>
    </section>
        <!-- <playlist-dashboard  :get-playlist-info='getPlaylistInfo'></playlist-dashboard> -->
        <!-- <split-overview  v-if="split.isActive"></split-overview> -->
        
    </div>
    <stats-table></stats-table>
    <quickmerge v-if="mergeActive"></quickmerge>
    <playback-controller></playback-controller>

    <edit-name-pop-up v-if="isModalOpen"></edit-name-pop-up>
    
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
