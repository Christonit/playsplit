import {mapState,mapGetters} from 'vuex';
export default {
    name:'functions',
    computed:{
        ...mapState(['player']),
        ...mapGetters(['authorization']),
        _PUT(){
            return {
                method: 'PUT',
                headers: this.authorization
                
              }
        },
        _POST(){
            return {
                method: 'POST',
                headers: this.authorization
              }
        }
    },
    methods:{
        playSong(context){
            if(this.$store.state.activePlaylist == false){ 
              fetch('https://api.spotify.com/v1/me/player/play?device_id='+this.$store.state.device_id,{
                  method: 'PUT',
                  headers: this.authorization,
                  body:JSON.stringify(
                      {context_uri: context
                    })
                }).then( () =>{

                    this.player.getCurrentState().then(state => {
                        
                        let {   current_track,
                                next_tracks, 
                                previous_tracks
                            } = state.track_window;

                        this.$store.commit('setCurrentPlayback',
                        {current_track,
                         next_tracks, 
                         previous_tracks
                        })
                        

                    })
                } )
            
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
    }
}