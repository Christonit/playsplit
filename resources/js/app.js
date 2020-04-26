/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vuex from 'vuex';
import VueDraggable from 'vue-draggable'


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import TopNav from './components/top-nav.vue';
import SidebarComp from './components/sidebar.vue';
import PlaylistDashboard from './components/playlists/playlist-dashboard.vue';
import PlaybackController from './components/playback-component.vue';
import StatsTable from './components/stats-table/stats-table.vue';
import store from './store/index.js';
import spotify from './spotify/core.js';

    


Vue.use(Vuex);
Vue.use(VueDraggable);

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',
    store,
    mixins:[spotify],
    components:{
        TopNav,
        SidebarComp,
        PlaybackController,
        PlaylistDashboard,
        StatsTable
    },
    created(){
     
        this.$store.dispatch('getUserData')
    }
});


window.onSpotifyWebPlaybackSDKReady = () => {
    app.$store.commit('setSDKReady',true)
}