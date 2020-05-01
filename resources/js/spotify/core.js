import {mapState, mapMutations, mapGetters} from 'vuex';

export default {
    data() {
      return {
          apiROOT: "https://api.spotify.com"
      };
    },
  
    computed: {            
      ...mapState(['user','isUserLoaded','isSDKLoaded','activePlaylist']),
      ...mapGetters(['authorization']),
      header_GET(){
            return {
                method: 'GET',
                headers:{
                    Authorization:`Bearer ${this.$store.state.user.access_token}`
                }
            }
        }
        
    },
  
    created() {

      let promise = new Promise( (resolve,reject) => {
        let timer =  setInterval(()=>{
             if( this.isUserLoaded == true && this.user !== '' && this.isSDKLoaded == true){
                 // this.setPlayer();

                 resolve('User info is loaded');
                 clearInterval(timer)
             }
         },10);

     }).then(() => this.getPlaylists(this.user.spotify_id))
     .then(() => this.setPlayer())
     .then(() => this.player.connect())
     .then(() => this.setPlayerId())      
      
    },
  
    methods: {
      getPlaylistInfo(playlist_id){
        return fetch(`${this.apiROOT}/v1/playlists/${playlist_id}`, this.header_GET).then( response => {
          if(response.status == 200){
            return response.text()
          }
            
        }).then(data => {

            let payload = JSON.parse(data);
            return payload;

        })

      },
    
      getPlaylists(user_id){
        return fetch(`${this.apiROOT}/v1/users/${user_id}/playlists`,this.header_GET).then( response => {
              if(response.status == 200){
                return response.text()
              }
                
          }).then(data => {

              let payload = JSON.parse(data);
              this.$store.commit('setPlaylists',payload.items)
              console.log('Playlists loaded')

          })
      },
      playSong(uri){
        if(this.activePlaylist == false){ 
          
          fetch('https://api.spotify.com/v1/me/player/play?device_id='+this.$store.state.device_id,{
              method: 'PUT',
              headers: this.authorization,
              body:JSON.stringify({uris: [uri]})
            }).then( (res)=> this.setPlaylistPlaying() ).then()
        }else{

          this.player.togglePlay()

        }
                              
                            
      },
      songMstoSeconds(song){
        let ms = song;
        let seconds = (ms / 1000 );
        let min = seconds / 60;
        let r = min % 1;
        let sec = (r * 60);
        if (sec < 10) {
            sec = '0'+sec;
        }
        min = Math.floor(min);
        sec = Math.floor(sec);


        return {
          min:min,
          sec:sec
        }
      },
      playTrack(){
        if(activePlaylist == false){
            this.player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });
        }
        
    },
    setPlayer(){
        const token = this.user.access_token;
        this.player = new Spotify.Player({
            name: 'Playsplit',
            getOAuthToken: cb => { cb(token); },
            volume:0.9
        });

        this.$store.dispatch('setPlayer',this.player)

        // Error handling
        this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.player.addListener('account_error', ({ message }) => { console.error(message); });
        this.player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        this.player.addListener('player_state_changed', state => { 
          if(state != null){
            let { 
                current_track,
                next_tracks, 
              } = state.track_window;

              this.$store.commit('setCurrentPlayback',{current_track,next_tracks})

            }

        
        });




    },
    setPlayerId(){
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.$store.commit('setDeviceId', device_id);
            this.isSpotifyOnline = true;
            
        });
    }

    }
  };
  