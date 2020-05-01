<template>
    <div id="playback">
        <div class="current-song">
            <img :src="playback.current_track.image != '' ? playback.current_track.image : 'https://via.placeholder.com/44'" alt="" class="current-song-img"/>
            <span>
                <span class="text highlight">{{playback.current_track.title}}</span>
                <span class="text">{{playback.current_track.artist}}</span>
            </span>
        </div>

        <div class="playback-controller">

            <div class="playback-timer">
                <span class="text-small">{{ `${playback.current_pos.min}:${playback.current_pos.sec}` }}</span>
                <div class="progress-bar">
                    <span class="progress-bar-tracker"></span>
                </div>
                <span class="text-small">{{ `${playback.current_track.duration.min}:${playback.current_track.duration.sec}` }}</span>
            </div>

            <div class="playback-btn-container">
                <button class="material-icons" @click="prevTrack">skip_previous</button>
                <button class="material-icons" @click="playStop">play_arrow</button>
                <button class="material-icons" @click="nextTrack">skip_next</button>
            </div>
            

        </div>

        <div class="up-next text-right">
            <span class="legend text">UP NEXT</span>
            <p class="my-0">{{playback.next_track.title}} - {{playback.next_track.artist}}</p>
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

                let next_track = {
                    artist : '',
                    title: ''
                }
                let current_pos = ''
                let current_track = {
                    artist : '',
                    title: '',
                    image: '',
                    duration: ''
                }

                if(this.current_playback != ''){

                    let current_track_sp = this.current_playback.current_track;

                    let next_track_sp = this.current_playback.next_tracks[0];

                    let artists = []
                    current_track_sp.artists.map( artist => artists.push( artist.name) )

                    artists = artists.join(', ');

                    let cover = current_track_sp.album.images[0].url;
                    

                    let next_artists = [];

                    next_track_sp.artists.map( artist => next_artists.push( artist.name) )

                    next_artists = next_artists.join(', ');


                    next_track.artist = next_artists
                    next_track.title = next_track_sp.name
                    
                    current_pos = this.songMstoSeconds(this.current_playback.position);


                    current_track.artist = artists
                    current_track.title =  current_track_sp.name
                    current_track.image = cover
                    current_track.duration = this.songMstoSeconds(current_track_sp.duration_ms)
                
                }

                return {current_track,next_track, current_pos}

            }
        },
        methods:{

            ...mapMutations(['setPlaylistPlaying']),

            playStop(){
                    this.player.togglePlay().then(() => {
                        console.log('Toggled playback!');
                    });
            
                
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
