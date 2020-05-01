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

        <div v-if="currentPlaylist != null " class="playlist-playing-container">
            <div>
                <span class="legend">
                    NOW PLAYING
                </span>

                <div class="d-flex align-items-center justify-content-between">

                    <b>{{currentPlaylist.title}}</b>

                    <span>50/{{ currentPlaylist.tracks}}</span>

                </div>
            </div>

            <img :src=" currentPlaylist.cover" alt="">
        </div>
    </aside>
</template>

<script>
import {mapState} from 'vuex';

    export default {
        name:'sidebar-comp',
        computed:{
            ...mapState(['currentPlaylist'])
        },
        mounted() {
        }
    }
</script>
