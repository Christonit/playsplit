@extends('layouts.app')

@section('content')
<div class="container-fluid">
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

</div>
@endsection
