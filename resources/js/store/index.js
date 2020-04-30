import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    isUserLoaded: false,
    isSDKLoaded: false,
    activePlaylist:false,
    device_id:null,
    playlists: [],
    isModalOpen:false,
    openModal:'edit-name'
  },
  mutations: {
    setUserData(state, payload){
        state.user = payload;
    },
    setPlaylistPlaying(state){
        state.activePlaylist ? state.activePlaylist = false : state.activePlaylist = true;
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
    },
    openCloseModal(state, payload) {
        state.isModalOpen ? state.isModalOpen = false : state.isModalOpen = true ;
        // state.openModal = payload;
        state.openModal = 'edit-name';

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