@extends('layouts.app')

@section('content')
    
    <top-nav ></top-nav>
    <sidebar-comp></sidebar-comp>
    <div class="app-container">

        <playlist-dashboard  ></playlist-dashboard>
        <split-overview  v-if="split.isActive"></split-overview>
        <playlist-detail  v-if="detailPlaylist.isActive"></playlist-detail>

        <callout-bottom 
            v-if="alerts.playback"
            :class="'alert global bottom'"
            :has-close-btn="true"
            callout-name="playback">
            <span slot='message'>Playback is only available to premium users.</span>
        </callout-bottom>
        
    </div>

    <stats-table v-if="statSelectedPlaylist.length > 0"></stats-table>
    <quickmerge v-if="mergeActive"></quickmerge>
    <!-- <playback-controller></playback-controller> -->

    <edit-name-pop-up v-if="isModalOpen" commit-name="setMergeName"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_1" :emition="true"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_2" :emition="true"></edit-name-pop-up>
    <edit-name-pop-up v-if="splitPlaylistModal.split_3" :emition="true"></edit-name-pop-up>
    <fab-button v-if='windowWidth < resolutions.lg'></fab-button>
    <lottie-player v-if='content_loaded.playback_ready == false'
                    class='app-loading' 
                    :options='loadingSrc.options' 
                    :src="loadingSrc.src"/>



@endsection
