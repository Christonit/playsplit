<template>
    <section id="playlists-list" class='section-container'>
            <div class="section-header">
                <h2 class="title">My playlists</h2>
                <div class="btn-container d-inline-flex align-items-center">
                    <button class=" mx-3 btn btn-secondary" 
                        v-if="mergeActive"
                        @click="cancelMerge">Cancel merge</button>
                    
                    <div class="view-type-toggle">
                        <button class="material-icons">view_list</button>
                        <button class="material-icons">view_module</button>
                    </div>
                </div>
                
            </div>

            <div class="section-body">
                <template v-if='playlists.length != 0'>
                    
                    <grid-item v-for='playlist in playlists' 
                        :key='playlist.id' 
                        :id="playlist.id" 
                        :tracks-total='playlist.tracks.total' 
                        :img="playlist.images" 
                        :name="playlist.name" 
                        :uri="playlist.uri" 
                        :get-playlist-info='getPlaylistInfo'>
                    </grid-item>

                </template>

                <div class="grid-list-item to-merge">
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
                        
                        <label for="toggle" class="toggle-label">
                            Preserve
                            <button class="btn-toggle active"> <hr/> </button>
                        </label>
                        <div class="btn-container">
                            <button>merge</button>
                            <button>split</button>
                        </div>
                        <span  class="material-icons btn-options">more_horiz</span>
                    </div>
                </div>

               
            </div>
            

        </section>
</template>

<script>

import GridItem from './grid-item.vue';
import {mapState} from 'vuex';

export default {
    name:'playlist-dashboard',
    props:['getPlaylistInfo'],
    components:{
        GridItem
    },
    mounted(){

    },
    computed:{
        ...mapState(['playlists','mergeActive'])
    },
    methods:{
        
        openModal(){
            this.$store.commit('openCloseModal',0)
        },
        cancelMerge(){
            let el = document.querySelectorAll('.grid-list-item.active')
            console.log(el)
            el.forEach(item => item.classList.remove('active'));
            this.$store.commit('emptyPlaylistToMerge');
            this.$store.commit('setMergeActive',false);
            this.$store.commit('setMergeName','');
        }
    }
}
</script>