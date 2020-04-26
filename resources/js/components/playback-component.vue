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
                <button class="material-icons">skip_previous</button>
                <button class="material-icons">play_arrow</button>
                <button class="material-icons">skip_next</button>
            </div>
            

        </div>

        <div class="up-next text-right">
            <span class="legend text">UP NEXT</span>
            <p class="my-0">Stay Scheming - Rick Ross, Drake</p>
        </div>
    </div>
</template>

<script>    

    import {mapState} from 'vuex';
    import spotify from '../spotify/core.js';

    export default {
        name:'playback-controller',
        mixins:[spotify],
        data(){
            return {
                isSpotifyOnline:false
            }
        },
        created(){
        
                let promise = new Promise( (resolve,reject) => {
                   let timer =  setInterval(()=>{
                        if( this.isUserLoaded == true && this.user !== '' && this.isSDKLoaded == true){
                            resolve('User info is loaded');
                            clearInterval(timer)
                        }
                    },10);

                }).then(() => this.getPlaylists(this.user.spotify_id))
                .then(() => this.player())
                    
            

        },
        mounted() {
            // Connect to the player!


        },
        computed:{
            ...mapState(['user','isUserLoaded','isSDKLoaded'])
        },
        methods:{
            player(){
                const token = this.user.access_token;
                const player = new Spotify.Player({
                    name: 'Playsplit',
                    getOAuthToken: cb => { cb(token); },
                    volume:0.9
                });

                // Error handling
                player.addListener('initialization_error', ({ message }) => { console.error(message); });
                player.addListener('authentication_error', ({ message }) => { console.error(message); });
                player.addListener('account_error', ({ message }) => { console.error(message); });
                player.addListener('playback_error', ({ message }) => { console.error(message); });

                // Playback status updates
                player.addListener('player_state_changed', state => { console.log(state); });

                player.connect().then( success => {
                    
                });
                // Ready
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                    this.$store.commit('setDeviceId', device_id);
                    this.isSpotifyOnline = true;
                    
                });

                // Not Ready
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player!
                player.connect();

            }
        }
    }
</script>
