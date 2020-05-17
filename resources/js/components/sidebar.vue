<template>
    <aside>

        <div class="nav-container">
            <a href="#" class="nav-item active">
                <i class="nav-item-icon playlist"></i>
                My playlists
            </a>
            <a href="#" class="nav-item ">
                <i class="nav-item-icon songs"></i>
                My songs
            </a>
        </div>

        <!-- <div v-if="currentPlaylist != null " class="playlist-playing-container"> -->
        <div  v-if="currentPlaylist != null" class="playlist-playing-container">
                <span class="legend">
                    NOW PLAYING
                </span>

                <div class="d-flex align-items-center justify-content-between">

                    <b>{{currentPlaylist.title}}</b>

                    <span>50/{{ currentPlaylist.tracks}}</span>

                </div>

            <img :src=" currentPlaylist.cover" alt="" class="current-playlist-img">
            <playback-controller>
            </playback-controller>

        </div>
        
    </aside>
</template>

<script>
import PlaybackController from '../components/playback-component.vue'
import {mapState} from 'vuex';

    export default {
        name:'sidebar-comp',
        computed:{
            ...mapState(['currentPlaylist'])
        },
        components:{
            PlaybackController,
        },
        mounted() {
        }
    }
</script>
