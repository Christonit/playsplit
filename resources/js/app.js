/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('./vuedraggable');

window.Vue = require('vue');
import Vuex from 'vuex';
import LottiePlayer from 'lottie-player-vue';
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
import Quickmerge from './components/quickmerge.vue';
import PlaylistDashboard from './components/playlists/playlist-dashboard.vue';
import StatsTable from './components/stats-table/stats-table.vue';
import store from './store/index.js';
import spotify from './spotify/core.js';
import EditNamePopUp from './components/modals/edit-name.vue';
import {mapState} from 'vuex';
import SplitOverview from './components/playlists/split/split-overview.vue';
import PlaylistDetail from './components/playlists/playlist-detail.vue';
import CalloutBottom from "./components/utilities/callout-bottom.vue";
import FabButton from "./components/utilities/fab-button.vue";

Vue.use(Vuex);
Vue.use(LottiePlayer);

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
    data:{
        loadingSrc:{
            src:'../img/loading-data.json',
            options:{
                autoplay:true,
                background:'none',
                renderer:'svg',
                loop:true,
                path:'../img/loading-data.json',
                width:'56px',
                height:'56px'
            }
        },
    },
    components:{
        TopNav,
        SidebarComp,
        PlaylistDashboard,
        StatsTable,
        EditNamePopUp,
        Quickmerge,
        SplitOverview,
        PlaylistDetail,
        CalloutBottom,
        FabButton
        // LottiePlayer
    },
    computed:{
        ...mapState(['resolutions','content_loaded','isModalOpen','mergeActive','split','splitPlaylistModal','detailPlaylist','statSelectedPlaylist','alerts']),
        windowWidth(){
            return window.innerWidth;
        }
    },
    created(){
     
        this.$store.dispatch('getUserData')
    }
});


window.onSpotifyWebPlaybackSDKReady = () => {
    app.$store.commit('setSDKReady',true)
}