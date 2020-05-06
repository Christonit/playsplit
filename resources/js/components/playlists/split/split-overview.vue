<template>

    <section id="split-playlist" class='action-container'>
        <div class="section-header">
            <h2 class="title">{{split.playlist.name}}</h2> 
            <div class="btn-container d-inline-flex align-items-center">
                <button class=" mx-3 btn btn-secondary" 
                        @click="cancelSplit">Cancel split</button>
            </div>

            <div class="section-header-description">
                <p class="text">Created by <b class="highlight"> {{split.playlist.owner.display_name}} </b> • {{split.playlist.tracks.total}} tracks • {{timePrinter}}</p>
            </div>
        </div>
    </section>
    
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import functions from '../../../spotify/function.js';

export default {
    name: "split-overview",
    mixins:[functions],
    computed:{
        ...mapState(['split']),
        timePrinter(){
            let time = this.split.playlist.duration.hours;
            let hours = (time != 0 ? `${time} ${( time > 1 ? 'hours': 'hour')}`: '')
           
           return `${hours} ${this.split.playlist.duration.min} minutes`;

            
        }
        
    },
    methods:{
        ...mapMutations(['cancelSplit']),
        fetchGenres(id){
            fetch(`${this.apiRoot}/tracks/${id}`,this._GET).then( res => res.text() ).then(data => {
                console.log(JSON.parse(data))
            });
        }
    }
}
</script>