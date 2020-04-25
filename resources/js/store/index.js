import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    isUserLoaded: false,
    isSDKLoaded: false,
    activePlaylist:null,
    device_id:null,
    playlists: []
  },
  mutations: {
    setUserData(state, payload){
        state.user = payload;
    },
    setUserOnline(state){
        state.isUserLoaded = true;
    },
    setSDKReady(state, isLoaded) {
        state.isSDKLoaded = isLoaded;
    },
    setPlaylists(state, payload) {
        state.playlists = payload;
    },
    setDeviceId(state, payload) {
        state.device_id = payload;
    }
  },
  actions:{
      getUserData(context){
        return fetch('/fetch-user-data').then(response => {
            if(response.status == 200) {
                return response.text()
            }
        }).then( data => {
           const user_data  = JSON.parse(data);
           context.commit('setUserData',user_data)
        })
        .then(context.commit('setUserOnline'))
      }
  }
})


export default store;