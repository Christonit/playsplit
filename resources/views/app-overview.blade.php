@extends('layouts.app')

@section('content')
    <top-nav></top-nav>
    <sidebar-comp></sidebar-comp>
    <div class="app-container">

        <playlist-dashboard  ></playlist-dashboard>
        <split-overview  v-if="split.isActive"></split-overview>
        <playlist-detail  v-if="detailPlaylist.isActive"></playlist-detail>
        
    </div>
    <stats-table v-if="statSelectedPlaylist.length > 0"></stats-table>
    <quickmerge v-if="mergeActive"></quickmerge>
    <!-- <playback-controller></playback-controller> -->

    <edit-name-pop-up v-if="isModalOpen" commit-name="setMergeName"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_1" :emition="true"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_2" :emition="true"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_3" :emition="true"></edit-name-pop-up>

@endsection
