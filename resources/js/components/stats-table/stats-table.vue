<template>
    <div id="music-stats">
        <h3 class="subtitle">Playlists stats</h3>

        <div class="stats-table" v-if="playlist_analisys.audio_features != null">
            <div class="stats-row">
                <span class="text">Inspecting</span>
                 <b class="highlight">{{ playlist_analisys.name}}</b>
            </div>
            <stat-row feature="acoustic" :feature-value="features.acoustic">
                <template slot="feauture-name">
                    Acousticness
                </template>
                <template slot="feauture-left-treshold">
                    Electric
                </template>
                <template slot="feauture-right-treshold">
                    Acoustic
                </template>
            </stat-row>

            <stat-row feature="vocals" :feature-value="features.vocals">
                <template slot="feauture-name">
                    Vocals
                </template>
                <template slot="feauture-left-treshold">
                    A lot
                </template>
                <template slot="feauture-right-treshold">
                    Instrumental
                </template>
            </stat-row>

            <stat-row feature="danceability" :feature-value="features.danceability">
                <template slot="feauture-name">
                    Danceability
                </template>
                <template slot="feauture-left-treshold">
                    Not danceable
                </template>
                <template slot="feauture-right-treshold">
                    Danceable
                </template>
            </stat-row>

            <stat-row feature="energy" :feature-value="features.energy">
                <template slot="feauture-name">
                    Energy
                </template>
                <template slot="feauture-left-treshold">
                    Chill
                </template>
                <template slot="feauture-right-treshold">
                    Energetic
                </template>
            </stat-row>

            

            <stat-row feature="tempo" :feature-value="features.tempo">
                <template slot="feauture-name">
                    Tempo
                </template>
                <template slot="feauture-left-treshold">
                    Slow
                </template>
                <template slot="feauture-right-treshold">
                    Fast
                </template>
            </stat-row>

            <stat-row feature="valence" :feature-value="features.valence">
                <template slot="feauture-name">
                    Mood
                </template>
                <template slot="feauture-left-treshold">
                    Down
                </template>
                <template slot="feauture-right-treshold">
                    Uplifting
                </template>
            </stat-row>
            
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
        }
    },
    mixins:[functions],
    components:{
        StatRow
    },
    mounted(){
        // this.getFeatures(this.playlistsIdString);
    },
    computed:{
        ...mapState(['playlist_analisys']),
        features(){
            let acoustic = 0;
            let danceability = 0;
            let energy = 0;
            let vocals = 0;
            let valence = 0;
            let tempo = 0;
            let total = this.playlist_analisys.audio_features.length;
            this.playlist_analisys.audio_features.forEach( audio =>{

                acoustic += audio.acousticness 
                danceability += audio.danceability
                energy += audio.energy
                vocals += audio.instrumentalness
                valence +=  audio.valence
                tempo +=  audio.tempo

            })  
            

            return {
                    acoustic: (acoustic/total),
                    danceability: (danceability/total),
                    energy: (energy/total),
                    vocals: (vocals/total),
                    valence: (valence/total),
                    tempo: (tempo/total)
                }
            }
        
    },
    watch:{
       
    },
    methods:{

    }
}
</script>