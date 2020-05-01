<template>
    <div id="playback">
        <div class="current-song">
            <img src="https://via.placeholder.com/44" alt="" class="current-song-img"/>
            <span>
                <span class="text highlight">Ibuki - Hishou Version</span>
                <span class="text">Yoshida Brothers</span>
            </span>
        </div>

        <div class="playback-controller">

            <div class="playback-timer">
                <span class="text-small">0:00</span>
                <div class="progress-bar">
                    <span class="progress-bar-tracker"></span>
                </div>
                <span class="text-small">0:00</span>
            </div>

            <div class="playback-btn-container">
                <button class="material-icons" @click="prevTrack">skip_previous</button>
                <button class="material-icons" @click="playStop">play_arrow</button>
                <button class="material-icons" @click="nextTrack">skip_next</button>
            </div>
            

        </div>

        <div class="up-next text-right">
            <span class="legend text">UP NEXT</span>
            <p class="my-0">Stay Scheming - Rick Ross, Drake</p>
        </div>
    </div>
</template>

<script>    

    import {mapState, mapMutations} from 'vuex';
    import functions from '../spotify/function.js'
    
    export default {
        name:'playback-controller',
        mixins:[functions],
        data(){
            return {
                isSpotifyOnline:false,
            }
        },
        created(){
        

        },
        mounted() {
            // Connect to the player!


        },
        computed:{
            ...mapState(['user','isUserLoaded','isSDKLoaded','activePlaylist','player','current_playback']),
            playback(){
                // if(current_playback != ''){
                // let current_track_sp = this.current_playback.current_track;
                // let next_track_sp = this.current_playback.next_tracks[0];

                // let artists = []
                // current_track_sp.map( artist => artists.push( artist.name) )

                // artist = artists.join(', ');

                // let cover = current_track_sp.album.images[0].url;
                

                // let next_artists = [];

                // next_track_sp.map( artist => next_artists.push( artist.name) )

                // next_artists = next_artists.join(', ');

                // let next_track = {
                //     artist : next_artists,
                //     title: next_track_sp.name
                // }

                // let current_track = {
                //     artist : artist,
                //     title: current_track_sp.name,
                //     image: cover,
                //     duration: duration_ms
                // }

                // return {current_track,next_track}
                // }

                                return 'hola'



            }
        },
        methods:{
            // setTrack(){
            //     fetch('',{
            //         method:'PUT',
            //         header:{
            //             Authorization:``
            //         }
            //     })
            // },
            ...mapMutations(['setPlaylistPlaying']),
            playStop(){
                // if(activePlaylist == false){
                    this.player.togglePlay().then(() => {
                        console.log('Toggled playback!');
                    });
            
                // }
                
            },

            nextTrack(){
                return fetch('https://api.spotify.com/v1/me/player/next',
                    this._POST
                )
            },

            prevTrack(){
                return fetch('https://api.spotify.com/v1/me/player/previous',
                    this._POST
                ).then(()=>{
                   
                })
            }
        
        }
    }
</script>
