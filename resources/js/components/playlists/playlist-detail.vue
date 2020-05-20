<template>

    
    <section id="playlist-detail" class='action-container'>
        <div class="section-header ">
            <h2 class="title my-0">{{detailPlaylist.detail.name}}</h2> 
            <div class="btn-container d-inline-flex align-items-center">
                <button class=" mx-3 btn btn-secondary" @click="close">Close</button>
                <button class="btn btn-primary">Split</button>
            </div>

            
                <p class="text section-header-description">Created by <b class="highlight">{{detailPlaylist.detail.owner.display_name}}</b> • {{detailPlaylist.detail.tracks.items.length}} tracks • {{timePrinter}}</p>
                <div class="top-genres-container" >
                    <span class="pill" v-for="genre in detailPlaylist.genres">{{genre}}</span>
                </div>
        </div>

        <div class="tracks-container" ref="tracks_container">
                <div class="track-row-header">
                    <span class="track-row-cell">#</span>
                    <span class="track-row-cell">Title</span>
                    <span class="track-row-cell">Artist</span>
                    <span class="track-row-cell">Duration</span>
                </div>

                

                    <ul class="track-rows-container" ref="og_playlist">
                        
                            <li class="track-row" v-for="(track,key) in detailPlaylist.detail.tracks.items" 
                                :key="key" >
                                <span class="track-row-cell">{{key + 1}}</span>
                                <span class="track-row-cell">{{track.track.name}}</span>
                                <span class="track-row-cell">{{ artists(track.track.artists) }}</span>
                                <span class="track-row-cell">{{minutesPrinter(track.track.duration_ms)}}</span>
                                <button  class="material-icons btn-options">more_horiz</button>

                            </li>

                    </ul>
                



        </div>
        
    </section>
    
    
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import functions from '../../spotify/function.js';
import EditName from '../modals/edit-name-split.vue';


export default {
    name: "playlist-detail",
    mounted(){
               
    },
    components:{
        EditName,
    },
    data(){
        return {
               
        }
    },
    mixins:[functions],
    computed:{
        ...mapState(['isModalOpen','detailPlaylist']),
        timePrinter(){
            let time = '';
            let totalMS = null;
            this.detailPlaylist.detail.tracks.items.map( item => {
                totalMS += item.track.duration_ms
            })

            time = this.trackMsToHrs(totalMS);
            let hours = (time.hours != 0 ? `${time.hours} ${( time.hours > 1 ? 'hours': 'hour')}`: '')
            // return hours;
           
           return `${hours} ${time.minutes} minutes`;

            
        },
        
       
      

    },
    methods:{
        ...mapMutations(['clearSplit','unsetDetailPlaylist']),
         minutesPrinter(ms){
            let time = this.songMstoSeconds(ms);

            return `${time.min}:${time.sec}`;
        },
        artists(artist_arr){
            let artists_collection = [];
            artist_arr.forEach( artist => {
                artists_collection.push(artist.name);
            })
            return artists_collection.join(', ');

        },
        close(){
            this.unsetDetailPlaylist();
        }
       
        
    

    }
}
</script>