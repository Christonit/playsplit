<template>
    <section id="playlists-list" class='section-container' > 
            <div class="section-header mb--24">
                <h2 class="title">My playlists</h2>
                <div class="btn-container d-inline-flex align-items-center">
                    <button class=" mx-3 btn btn-secondary" 
                        v-if="mergeActive"
                        @click="cancelMerge">Cancel merge</button>
                    
                    <div class="view-type-toggle">
                        <button class="material-icons active" @click="viewToggle('list')" ref='list_toggle'>view_list</button>
                        <button class="material-icons" @click="viewToggle('card')" ref='card_toggle'>view_module</button>
                    </div>
                </div>
                
            </div>

            <div class="section-body" ref='playlistsList'>
                <template v-if='playlists.length != 0'>
                    
                    <grid-item v-for='(playlist,key) in playlists'
                        :key='key' 
                        :id="playlist.id" 
                        :tracks-total='playlist.tracks.total' 
                        :img="playlist.images" 
                        :name="playlist.name" 
                        :uri="playlist.uri" 
                        >
                    </grid-item>

                </template>
                <lottie-player v-if='isLoading'
                    class="content-loading"
                    :options='loadingSrc.options' 
                    :src="loadingSrc.src"/>
            </div>
            

        </section>
</template>

<script>

import GridItem from './grid-item.vue';
import functions from '../../spotify/function'
import {mapState, mapMutations} from 'vuex';

export default {
    name:'playlist-dashboard',
    mixins:[functions],
    data(){
        return {
            offset:{
                active:true,
                current:20},
                isLoading:false,
                loadingSrc:{
                    src:'../../../img/loading-content-data.json',
                    options:{
                        autoplay:true,
                        background:'none',
                        renderer:'svg',
                        loop:true,
                        path:'../../../img/loading-content-data.json',
                        width:'32px',
                        height:'32px'
                    }
                },
            }
    },
    // props:['getPlaylistInfo'],
    components:{
        GridItem
    },
    mounted(){

            let listBody =  this.$refs.playlistsList
            listBody.addEventListener('scroll', e => {
                   if((listBody.scrollTop + listBody.clientHeight) >=  listBody.scrollHeight ){
                        this.isLoading = true;
                        let user_id = this.$store.state.user.spotify_id;

                        fetch(`${this.apiRoot}/users/${user_id}/playlists?limit=20&offset=${this.offset.current}`,
                        {method:'GET',
                        headers:
                        this.$store.getters.authorization}).then( res => {
                            if(res.status == 200){
                                return res.text()
                            }
                        })
                        .then( data => {
                            let playlist = JSON.parse(data);

                            let payload = playlist.items;
                            payload.map( item => {
                                this.appendPlaylists(item)
                            })
                            this.isLoading = false;
                            this.offset.current += 20;
                        });
                   } 
            })

            let interval = setInterval( ()=> {
                if(this.playlists.length > 0){
                    let first_playlist_id = this.playlists[0].id;

                    this.getPlaylistInfo(first_playlist_id).then( data => {
                        let arr = [];

                        data.tracks.items.map( item => {
                            arr.push(item.track.id);
                        })

                        return arr;
                    })
                    .then( data => this.addStatPlaylist(data) ).then( ()=>{
                            // console.log(this.playlistsIdString);
                        this.getAudioFeatures(this.playlistsIdString).then( data => {

                            this.setAudioFeatures({
                                name: this.playlists[0].name,
                                content: data.audio_features
                                }) 
                            
                        })
                    })

                    clearInterval(interval)
                }
            },100);

        
    },
    computed:{
        ...mapState(['apiRoot','playlists','mergeActive','statSelectedPlaylist']),
        playlistsIdString(){
            return this.statSelectedPlaylist.join(',')
        }
       
    },
    methods:{
        ...mapMutations(['emptyPlaylistToMerge',
        'setMergeActive',
        'setMergeName',
        'openCloseModal',
        'emptyPlaylistToDelete',
        'addStatPlaylist',
        'setAudioFeatures',
        'appendPlaylists']),
        openModal(){
            this.openCloseModal(0)
        },
        cancelMerge(){
            // force trick to completely hide the toggle when click clear or cancel
            let toggle = document.querySelectorAll('.grid-list-item.to-merge .toggle-container')
            toggle.forEach(item => item.classList.add('hide'));

            let el = document.querySelectorAll('.grid-list-item.to-merge')
            el.forEach(item => item.classList.remove('to-merge'));
            this.emptyPlaylistToMerge();
            this.emptyPlaylistToDelete();        
            this.setMergeActive(false);
            this.setMergeName('');
        
        },
        inspectAudioFeatures(){

        },
        viewToggle(view_mode){
            if( view_mode == 'card'){
                this.$refs.playlistsList.classList.add('grid-cards')
                this.$refs.list_toggle.classList.remove('active')
                this.$refs.card_toggle.classList.add('active')

            }else{
                this.$refs.playlistsList.classList.remove('grid-cards')
                    this.$refs.list_toggle.classList.add('active')
                this.$refs.card_toggle.classList.remove('active')

            }
        }
    }
}
</script>