import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    isUserLoaded: false,
    isSDKLoaded: false,
    activePlaylist:false,
    isPlayPaused:false,
    currentPlaylist:null,
    device_id:null,
    playlists: [],
    isModalOpen:false,
    openModal:'edit-name',
    player:null,
    current_playback:'',
    passed_time:0,
    passed_time_ms:0,
    mergeActive:false,
    playlistToMerge:[],
    mergeDurationMs:0,
    mergeName:'',
    playlistsToDelete:[],
  },
  getters:{
    authorization(state){
        return { 'Content-Type': 'application/json','Authorization':`Bearer ${state.user.access_token}`}          
    }
  },
  mutations: {
    setMergeActive(state, payload){
        state.mergeActive = payload
    },
    setMergeName(state, payload){
        state.mergeName = payload
    },
    setPlaylistToMerge(state,payload){
        state.playlistToMerge.push(payload)
    },
    addLatestPlaylist(state,payload){
        state.playlists.unshift(payload)
    },
    //Merge related mutations
    addMergeDurationMs(state,payload){
        state.mergeDurationMs += payload
    },
    substractMergeDurationMs(state,payload){
        state.mergeDurationMs -= payload
    },
    emptyMergeDurationMs(state){
        state.mergeDurationMs = 0
    },
    removePlaylistToMerge(state,queueId){
        state.playlistToMerge.splice(queueId,1)
    },
    emptyPlaylistToMerge(state){
        state.playlistToMerge = []
    },

    // end merge
    setPassedTime(state, payload){
        state.passed_time = payload
    },
    setPassedTimeMs(state, payload){
        state.passed_time_ms = payload
    },
    setPlayer(state, payload){
        state.player = payload;
    },
    setUserData(state, payload){
        state.user = payload;
    },
    setCurrentPlaylist(state, payload){
        state.currentPlaylist = payload;
    },
    setIfPlaylitPaused(state, payload){
        state.isPlayPaused = payload;
    },
    setPlaylistPlaying(state, payload){
        state.activePlaylist = payload;
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
    },
    unpreservePlaylist(state,payload){
        state.playlistsToDelete.push(payload)
    },
    preservePlaylist(state,payload){
        state.playlistsToDelete.splice(payload,1)
    },
    emptyPlaylistToDelete(state){
        state.playlistsToDelete = []
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
      getCurrentPlaylist(context,payload){
        context.commit('setCurrentPlaylist', payload)
        context.commit('setPlaylistPlaying', true)

      }

  }
})


export default store;