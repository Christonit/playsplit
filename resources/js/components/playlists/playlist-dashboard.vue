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
                    
                    <grid-item v-for='(playlist,key) in playlists' 
                        :key='key' 
                        :id="playlist.id" 
                        :tracks-total='playlist.tracks.total' 
                        :img="playlist.images" 
                        :name="playlist.name" 
                        :uri="playlist.uri" 
                        :get-playlist-info='getPlaylistInfo'
                        >
                    </grid-item>

                </template>

            </div>
            

        </section>
</template>

<script>

import GridItem from './grid-item.vue';
import {mapState, mapMutations} from 'vuex';

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
        ...mapMutations(['emptyPlaylistToMerge',
        'setMergeActive',
        'setMergeName',
        'openCloseModal',
        'emptyPlaylistToDelete']),
        openModal(){
            this.openCloseModal(0)
        },
        cancelMerge(){
            // force trick to completely hide the toggle when click clear or cancel
            let toggle = document.querySelectorAll('.grid-list-item.to-merge .toggle-container')
            toggle.forEach(item => item.classList.add('hide'));

            let el = document.querySelectorAll('.grid-list-item.to-merge')
            el.forEach(item => item.classList.remove('to-merge'));
            this.emptyPlaylistToMerge();
            this.emptyPlaylistToDelete();        
            this.setMergeActive(false);
            this.setMergeName('');
            

        }
    }
}
</script>