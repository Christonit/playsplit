export default {
    data() {
      return {
          apiROOT: "https://api.spotify.com"
      };
    },
  
    computed: {
      header_GET(){
            return {
                method: 'GET',
                headers:{
                    Authorization:`Bearer ${this.$store.state.user.access_token}`
                }
            }
        },
        authorization(){

            return { 'Content-Type': 'application/json','Authorization':`Bearer ${this.$store.state.user.access_token}`}          
        }
    },
  
    created() {
      
    },
  
    methods: {
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
      playSong(e){
        return fetch('https://api.spotify.com/v1/me/player/play?device_id='+this.$store.state.device_id,{
                            method: 'PUT',
                            headers: this.authorization,
                            body:JSON.stringify({uris: ["spotify:track:7xGfFoTpQ2E7fRF5lN10tr"]})
                        }).then( (res)=> console.log(res))
                              
                            
      }

    }
  };
  