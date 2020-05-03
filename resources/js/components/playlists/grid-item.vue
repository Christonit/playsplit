<template>
    <div class="grid-list-item" ref="playlist_preview" 
        @click="expandOrMerge">
        <div class="grid-list-img">
            <template v-if="img.length == 0 || img == undefined">
                <img src=" https://via.placeholder.com/88"  :alt="name+' - cover'">
            </template>
            <img v-else :src="img[0].url" :alt="name+' - cover'">
            <button class="btn-play material-icons" 
                @click="play">
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
            <span class="grid-list-text">{{totalDuration.hours > 0 ? `${totalDuration.hours} hours` : ''}}  {{totalDuration.min}} min</span>
        </div>

        <div class="grid-actions-container">
            <div class="btn-container" v-if="!mergeActive">
                <button @click="activateMerge">merge</button>
                <button>split</button>
            </div>
            <span  class="material-icons btn-options">more_horiz</span>
        </div>
    </div>
</template>

<script>
import functions from '../../spotify/function.js';
import {mapState,mapMutations} from 'vuex';

export default {
    name:'grid-item',
    props:['id','uri', 'name', 'img','tracks-total','getPlaylistInfo'],
    mixins:[functions],
    data(){
        return{
            playlist:null,
            playlistMergeData:null,
            duration:null,
            queueId:null
        }
    },
    computed:{
        ...mapState(['current_playback','timer','mergeActive','playlistToMerge']),
        totalDuration(){
            let totalInMinutes = this.songMstoSeconds(this.duration);

                let hours = totalInMinutes.min / 60;

                let r = hours % 1;

                hours = Math.floor(hours);

                let minutes = Math.floor((r * 60));

            return {hours: hours, min: minutes };
        },
        
         playlistsTracks(){
            let track_list = [];

            if(this.tracksTotal > 0  & this.playlist != null  ){
                let item = this.playlist.tracks.items;
                item.map( track => {
                    
                    let obj = {
                        id : track.track.id,
                        title: track.track.name,
                        uri: track.track.uri,
                        duration: this.songMstoSeconds(track.track.duration_ms),
                        artists: track.track.artists
                    }
                    track_list.push(obj)
                })
            } 

           return track_list;

        },
        tracksURIS(){
                let arr = []
                if(this.playlistsTracks.length > 0){
                    this.playlistsTracks.map( item =>arr.push(item.uri) );
                }
                return arr;
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
            
        }).then( () =>{

            
        })
        
    },
    methods:{
        ...mapMutations([
        'setPlaylistToMerge',
        'removePlaylistToMerge',
        'addMergeDurationMs',
        'substractMergeDurationMs'
        ]),
        expandOrMerge(){

            if(this.mergeActive){
                 let el = this.$refs.playlist_preview

                if(el.classList.contains('active')){
                    this.removePlaylistToMerge(this.queueId)
                    this.substractMergeDurationMs(this.duration)
                    el.classList.remove('active')

                }else{

                    el.classList.add('active')
                    let mergeLength = this.playlistToMerge.length;

                    this.queueId = mergeLength;

                    this.selectToMerge().then( playlist =>{
                        this.setPlaylistToMerge(playlist)
                        this.addMergeDurationMs(this.duration)
                    })


                }

            }else{
                console.log('Expaaaaand')
            }
        },
        activateMerge(){

            this.$store.commit('setMergeActive', true)
        },
        selectToMerge(){
            return new Promise((resolve)=> {
                        let playlist = {
                            id: this.playlist.id,
                            tracks: this.sortTracks()
                        }


                        return resolve(playlist);
            })

            // return;
            
        },
        sortTracks(){
            let tracks = []

            let el = this.playlist.tracks;

            el.items.map( track => tracks.push( track.track.uri) );
            
            return tracks;
        },
         play(){
            this.playSong(this.uri)
            this.$store.dispatch('getCurrentPlaylist',{
                    title:this.name, 
                    tracks:this.tracksTotal,
                    cover: this.playlist.images[0].url
                })
            
        }
        
    }
}
</script>