<template>
    <div class="grid-list-item">
        <div class="grid-list-img">
            <template v-if="img.length == 0 || img == undefined">
                <img src=" https://via.placeholder.com/88"  :alt="name+' - cover'">
            </template>
            <img v-else :src="img[0].url" :alt="name+' - cover'">
            <button class="btn-play material-icons">
                play_arrow
            </button>
        </div>
        <div class="grid-cell">
            <a href='#' class="grid-list-heading">{{name}}</a>
            <span class="grid-list-text">New age, synthwave, hip hop...</span>
        </div>


        <div class="grid-cell">
            <span class="grid-list-text">{{tracksTotal}} tracks</span>
        </div>
        <div class="grid-cell">
            <span class="grid-list-text">{{getTotalDuration.hours > 0 ? `${getTotalDuration.hours} hours` : ''}}  {{getTotalDuration.min}} min</span>
        </div>

        <div class="grid-actions-container">
            <div class="btn-container">
                <button>merge</button>
                <button>split</button>
            </div>
            <span  class="material-icons btn-options">more_horiz</span>
        </div>
    </div>
</template>

<script>
import spotify from '../../spotify/core.js'
export default {
    name:'grid-item',
    props:['id','uri', 'name', 'img','tracks-total'],
    mixins:[spotify],
    data(){
        return{
            playlist:null,
            duration:null
        }
    },
    computed:{
        getTotalDuration(){
            let totalInMinutes = this.songMstoSeconds(this.duration);

                let hours = totalInMinutes.min / 60;

                let r = hours % 1;

                hours = Math.floor(hours);

                let minutes = Math.floor((r * 60));

            return {hours: hours, min: minutes };
        }
    },
    mounted(){
        this.getPlaylistInfo(this.id).then( res => this.playlist = res).then( ()=>{
            let total_ms = 0

            let tracks_array = this.playlist.tracks.items;
                if(tracks_array.length > 0){
                    tracks_array.map( track => {
                    return total_ms  += track.track.duration_ms;
                });
               this.duration = total_ms;
            }
            
        })
        

    }
}
</script>