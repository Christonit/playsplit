<template>
    <div id="music-stats">
        <h3 class="subtitle">Playlists stats</h3>

        <div class="stats-table">
            <stat-row></stat-row>
        </div>
    </div>
</template>

<script>

import StatRow from './stat-row.vue';
import functions from '../../spotify/function';
import {mapState, mapMutations} from 'vuex';
export default {
    name:'stats-table',
    data(){
        return{
            audio_features:''
        }
    },
    mixins:[functions],
    components:{
        StatRow
    },
    mounted(){

    },
    computed:{
        ...mapState(['statSelectedPlaylist']),
        playlistsIdString(){
            return this.statSelectedPlaylist.join(',')

        },
        audioFeatures(){

            // if( this.playlistsIdString.length > 0){
                return this.playlistsIdString;


                return this.getFeatures(this.playlistsIdString);
            // }
        }
    },
    watch:{
       
    },
    methods:{

        getFeatures(id){
            let features = null;
            console.log(id)
                this.getAudioFeatures(id).then( data => {
                    features = data;
                    console.log('xxx')

                })

            return features;    

        }
    }
}
</script>