<template>
    <div class="grid-list-item" 
        :id="id"
        ref="playlist_preview" 
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
            <span class="grid-list-heading">{{playlist_name}}</span>
            <span class="grid-list-text">
                {{topGenres}}
            </span>
        </div>


        <div class="grid-cell">
            <span class="grid-list-text">{{tracksTotal}} tracks</span>
        </div>
        <div class="grid-cell">
            <span class="grid-list-text">{{totalDuration.hours > 0 ? `${totalDuration.hours} hrs` : ''}}  {{totalDuration.min}} min</span>
        </div>

        <div class="grid-actions-container">
            <div class="btn-container" v-if="!mergeActive">
                <button @click="activateMerge" name="btn-merge" class="btn-action merge"> <span class="tooltip">Merge</span> </button>
                <button @click="splitThis" name="btn-split" class="btn-action split"> <span class="tooltip">Split</span></button>
                <button @click="inspectStats"  class="btn-action" name="btn-inspect-stats"><span class="material-icons">bar_chart</span>  <span class="tooltip">Check stats</span></button>
            </div>



            <div ref='toggleId' class="toggle-container">
                <toggle-btn 
                @toggle=" preservationControl"
                v-if="isActive & mergeActive">
                <template slot="title"> Preserve</template>
                </toggle-btn>
            </div>

            <div class="btn-options">
                <span  class="material-icons">more_vert</span>

                <div class="dropdown-items">
                    <button class="dropdown-item">Edit</button>
                    <button class="dropdown-item">Delete</button>
                </div>

            </div>
            

        </div>
    </div>
</template>

<script>
import toggleBtn from "../utilities/toggle.vue";
import functions from '../../spotify/function.js';
import {mapState,mapMutations} from 'vuex';

export default {
    name:'grid-item',
    props:['id','uri', 'name', 'img','tracks-total'],
    mixins:[functions],
    components:{
        toggleBtn
    },
    data(){
        return{
            playlist:null,
            playlistMergeData:null,
            duration:null,
            queueId:null,
            isActive:false,
            genres:[],
            top5Genres:[]
        }
    },
    mounted(){
        let id = this.$refs.playlist_preview.id;
        this.getPlaylistInfo(id)
            .then( res => {
            this.playlist = res})
            .then( ()=>{
            let total_ms = 0

            let tracks_array = this.playlist.tracks.items;
                if(tracks_array.length > 0){
                    tracks_array.map( track => {
                    return total_ms  += track.track.duration_ms;
                });
               this.duration = total_ms;
            }
            
        })

        const interval = setInterval( () => {
            if(this.artistsIds.length > 0 ){
                this.getPlaylistGenres(this.artistsIds).then( data => {
                    let genres = JSON.parse(data) 
                    return ( this.genres = genres.reverse());
                }).then( ()=>{
                    this.genres.map((genre,key) => {
                        if( key < 5){
                            let genres = genre.split(":");
                            this.top5Genres.push(genres[0]);
                        }
                    })
                    
                });

                clearInterval(interval);

            }
        }, 100)
        
    },
    computed:{
        ...mapState([
        'current_playback',
        'timer',
        'mergeActive',
        'playlistToMerge',
        'resolutions']),
        duration_ms(){
            let total_ms = 0

            let tracks_array = this.playlist.tracks.items;
            if(tracks_array.length > 0){
                tracks_array.map( track => {
                    return total_ms  += track.track.duration_ms;
                });
            
                return total_ms;
            }
            

        },
        playlist_name(){
            if(this.name.length > 30){
                return this.name.slice(0,28) + '...'
            }

            return this.name;
        },
        artistsIds(){
            let IDs = []

            if(this.playlist != null){
                if(this.playlist.tracks.total > 0){
                    this.playlist.tracks.items.forEach(playlist => {
                        playlist.track.artists.forEach( artist => {
                            IDs.push(artist.id);
                        })
                    })

                }
            }
            return IDs;
        },
        topGenres(){
            if(this.top5Genres.join(', ').length > 30){
                return `${this.top5Genres.join(', ').slice(0,28)}...`;  
             }
            
             return this.top5Genres.join(', ');
        },
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
        },
        trackIDs(){
                let arr = []
                if(this.playlistsTracks.length > 0){
                    this.playlistsTracks.map( item =>arr.push(item.id) );
                }
                return arr;
        },

        toggleCheck(){
            let el = this.$refs.playlist_preview;

            if(el.classList.contains('to-merge')){
                return true
            }
            
            if(!el.classList.contains('to-merge')){
                return false
            }
            
        }

        
    },
    methods:{
        ...mapMutations([
        'setPlaylistToMerge',
        'removePlaylistToMerge',
        'addMergeDurationMs',
        'setSelectedToMerge',
        'substractMergeDurationMs',
        'setSplitActive',
        'setDetailPlaylist',
        'setAudioFeatures',
        'toggleStatsMobile'
        ]),
        preservationControl($event){

            if( $event == true){

                this.restoreFromDeletePlaylistBatch()

            }else if($event == false){

                this.$store.commit('unpreservePlaylist', this.id)
            }

            return;

        },
        restoreFromDeletePlaylistBatch(){

            let el = this.$store.state.playlistsToDelete;

             el.filter((element,key) => {
                    if(element == this.id){
                        return this.$store.commit('preservePlaylist',key)
                    }
            });
        },
        expandOrMerge(e){

            if(this.mergeActive){
                 let el = this.$refs.playlist_preview
                 let toggle = this.$refs.toggleId;

                if(el.classList.contains('to-merge')){
                    this.restoreFromDeletePlaylistBatch()
                    this.removePlaylistToMerge(this.queueId)
                    this.substractMergeDurationMs(this.duration)
                    this.isActive = false
                    el.classList.remove('to-merge')
                    toggle.classList.add('hide')

                }else{
                    el.classList.add('to-merge')
                    let mergeLength = this.playlistToMerge.length;

                    this.queueId = mergeLength;
                    this.isActive = true
                    this.selectToMerge().then( playlist =>{
                        this.setPlaylistToMerge(playlist)
                        this.addMergeDurationMs(this.duration)
                    })

                    toggle.classList.remove('hide')

                }

            }else{
                this.inspectPlaylist(e);
                
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
         play(e){

            if( this.$store.state.user.account_type == "premium"){

                this.playSong(this.uri);
            
                this.$store.dispatch('getCurrentPlaylist',{
                    title:this.name, 
                    tracks:this.tracksTotal,
                    track_ids:this.trackIDs,
                    cover: this.img[0].url
                })

            }else{
               this.$store.commit('setAlert',{ name: 'playback' , payload: true}) 
            }
            
            e.stopPropagation();   
        },

        splitThis(e){

            let id = this.$refs.playlist_preview.id;

            this.getPlaylistInfo(id).then( playlist => {

                this.setSplitActive({playlist: playlist ,duration:this.totalDuration, genres:this.top5Genres})

            })

            e.stopPropagation();
        },
        inspectPlaylist(e){

            let genres = this.top5Genres;
            let playlist_info = this.getPlaylistInfo(this.id);

            playlist_info.then( res => {
                let detail = res
                this.setDetailPlaylist({detail,genres})
            });

            e.stopPropagation();

        },
         inspectStats(e){

            let track_ids = this.trackIDs.join(',');
            this.getAudioFeatures(track_ids).then( data => {

                this.setAudioFeatures({
                    name: this.playlist.name,
                    content: data.audio_features
                    }) 

            })

            if(window.innerWidth < this.resolutions.lg){

                this.toggleStatsMobile(true);

            }

            e.stopPropagation();

        }
        
    }
}
</script>