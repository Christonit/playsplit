<template>
    <div>
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
                        <button class="btn btn-secondary" @click="clearMerge" :disabled='(totalPlaylists == 0)'>Clear selected</button>
                        <button class="btn btn-primary" 
                                :disabled="errors.to_many_tracks || (totalPlaylists == 0)"
                                @click="createMergedPlaylist">
                                Merge
                        </button>
                    </div>
        </div>
        <div :class="'callout alert'" v-if="errors.to_many_tracks" >
            <span class="material-icons icon">
                warning
            </span>
            <span class="callout-message">Currently Spotify just let upload up to 100 tracks at a time. Please, reduce your selected tracks.</span>
            <!-- <button class="close material-icons" @click="close">close</button> -->
        </div>
    </div>

</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex';
import functions from '../spotify/function.js';

export default {
    name:'quickmerge',
    data(){
        return {
            errors:{
                to_many_tracks: false
            }
        }
    },
    mixins:[functions],
    computed:{
        ...mapState(['playlistToMerge','mergeDurationMs','mergeName','user','playlistsToDelete']),
        ...mapGetters(['authorization']),
        totalPlaylists(){
            return this.playlistToMerge.length;
        },
        playlistTrackCount(){
            let tracks = this.playlistToMerge;
            let counter = 0;
            tracks.map( el => (counter += el.tracks.length) )
            if(counter >= 100){
                this.errors.to_many_tracks = true;
            }else{
                this.errors.to_many_tracks = false;
            }
            return counter;
        },
        totalTime(){

            return this.trackMsToHrs(this.mergeDurationMs)

        },
        concatToMerge(){
            let forConcat = this.playlistToMerge;

            let payload = [];

            forConcat.map( item => {
                payload = payload.concat(item.tracks)
            })

            return payload;

        }
    },
    methods:{
        ...mapMutations(['emptyPlaylistToMerge','removePlaylist']),
        openModal(){
            this.$store.commit('openCloseModal',0)
        },
        clearMerge(){
            // force trick to completely hide the toggle when click clear or cancel
            let toggle = document.querySelectorAll('.grid-list-item.to-merge .toggle-container')
            toggle.forEach(item => item.classList.add('hide'));

            let el = document.querySelectorAll('.grid-list-item.to-merge')
            el.forEach(item => item.classList.remove('to-merge'));
            this.$store.commit('emptyMergeDurationMs');        
            this.$store.commit('emptyPlaylistToMerge');        
            this.$store.commit('emptyPlaylistToDelete');        

        },
        close(){
        //    let el = document.querySelector('.callout.alert')

        //    el.classList.add('hide')
            this.error.to_many_tracks = false;
        },
        createMergedPlaylist(){
            fetch(`https://api.spotify.com/v1/users/${this.user.spotify_id}/playlists`,{
                method:'POST',
                headers:this.authorization,
                body:JSON.stringify({
                    name: this.mergeName
                })
            })
            .then(response => {
                let status = response.status;
                if( status == 200 || status == 201 ){
                    return response.text()
                }else{

                }

            })
            .then(response => {
                let data = JSON.parse(response)
                if(this.playlistsToDelete.length != 0){
                    let arr = this.playlistsToDelete;
                    let playlists = this.$store.state.playlists;

                    arr.map( item => {
                        
                        this.deletePlaylist(item)
                        playlists.forEach( (old, key) => {
                            if(old.id == item){
                                this.removePlaylist(key);
                            }
                        })

                    })

                    
                }
                return data.id

            })
            .then( id => {

                //    This request add tracks payload to new playlist 
                let addTracksStatus=  fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`,{
                    method:'POST',
                    headers:this.authorization,
                    body:JSON.stringify({
                        uris: this.concatToMerge
                    })
                }).then( res => {
                    let status = res.status;

                    // This condition gere is for what to do 
                    // after successfull track adding or error handling
                    if(status == 200 || status == 201){
                        
                        // Force rerender for last added playlist or force a page reload.
                        this.clearMerge()
                        this.fetchLatestMerge(id);

                    }

                })

              
            
            })

        },
        fetchLatestMerge(id){
                fetch(`https://api.spotify.com/v1/playlists/${id}`,{
                        method:'GET',
                        headers:this.authorization
                        }).
                        then(response => {
                            let status = response.status

                            if( status == 200  || status == 201){
                                return response.text();
                            };
                        })
                        .then( data => {
                            let playlist = JSON.parse(data);

                            this.$store.commit('addLatestPlaylist', playlist)


                        });
        },
        deletePlaylist(playlist_id){
            return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/followers`,{
                method:'DELETE',
                headers:this.authorization
            }).then( res => console.log(res))
        }
    }
}
</script>