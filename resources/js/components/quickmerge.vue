<template>
    <div id="quickmerge">
                <div class="merge-info-review">
                    <span class="merge-title" @click="openModal">{{ (mergeName!= '') ? mergeName : 'Type playlist name'}}</span> 
                    <p class="text mb-0">

                        <span class="highlight" v-if="totalPlaylists == 0">Select one or more playlits to merge</span>
                        <span class="highlight" v-else-if="totalPlaylists == 1">Select one more playlit to merge</span>
                        <span class="highlight" v-else> {{totalPlaylists}} playlists selected</span>
                        
                         | {{playlistTrackCount}} tracks, {{`${totalTime.hours}:${totalTime.minutes}`}}</p>
                </div>
                <div class="btn-container">
                    <button class="btn btn-secondary" @click="clearMerge">Clear selected</button>
                    <button class="btn btn-primary">Merge</button>
                </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import functions from '../spotify/function.js';

export default {
    name:'quickmerge',
    mixins:[functions],
    computed:{
        ...mapState(['playlistToMerge','mergeDurationMs','mergeName']),
        totalPlaylists(){
            return this.playlistToMerge.length;
        },
        playlistTrackCount(){
            let tracks = this.playlistToMerge;
            let counter = 0;
            tracks.map( el => (counter += el.tracks.length) )

            return counter;
        },
        totalTime(){

            return this.trackMsToHrs(this.mergeDurationMs)

        }
    },
    methods:{
        ...mapMutations(['emptyPlaylistToMerge']),
        openModal(){
            this.$store.commit('openCloseModal',0)
        },
        clearMerge(){
            let el = document.querySelectorAll('.grid-list-item.active')
            el.forEach(item => item.classList.remove('active'));
            this.$store.commit('emptyMergeDurationMs');        
            this.$store.commit('emptyPlaylistToMerge');        
        }
    }
}
</script>