<template>
    <aside :class="showSidebarMobile ? 'show' : '' " ref='sidebar'>

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
                
            <playback-controller>
            </playback-controller>

        </div>

        <button class="btn btn-secondary" name="close-btn" 
            v-if="showSidebarMobile"
            @click="closeSidebar">
                Close sidebar
        </button>
        
    </aside>
</template>

<script>
import PlaybackController from '../components/playback-component.vue'
import {mapState} from 'vuex';

    export default {
        name:'sidebar-comp',
        computed:{
            ...mapState(['currentPlaylist',
            'showSidebarMobile'])
        },
        components:{
            PlaybackController,
        },
        mounted() {
        },
        methods:{
            closeSidebar(){
                this.$store.commit('toggleSidebarMobile', false);
            }
        }
    }
</script>
