import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    isUserLoaded: false,
    isSDKLoaded: false,
    activePlaylist:false,
    currentPlaylist:null,
    device_id:null,
    playlists: [],
    isModalOpen:false,
    openModal:'edit-name',
    player:null,
    current_playback:''
  },
  getters:{
    authorization(state){
        return { 'Content-Type': 'application/json','Authorization':`Bearer ${state.user.access_token}`}          
    }
  },
  mutations: {
    setPlayer(state, payload){
        state.player = payload;
    },
    setUserData(state, payload){
        state.user = payload;
    },
    setCurrentPlaylist(state, payload){
        state.currentPlaylist = payload;
    },
    setPlaylistPlaying(state){
        state.activePlaylist == false ? state.activePlaylist = true : '';
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

    },
    setCurrentPlayback(state,payload){
        state.current_playback = payload;
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
      },
      setPlayer(context,payload){
          context.commit('setPlayer', payload)
      },
    //   getCurrentPlayback(context,payload){
    //       context.commit('setCurrentPlayback',payload)
    //   }
  }
})


export default store;