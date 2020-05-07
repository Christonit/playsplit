<template>

    
    <section id="split-playlist" class='action-container'>
        <div class="section-header">
            <h2 class="title">PLaylist de prueba 2</h2> 
            <div class="btn-container d-inline-flex align-items-center">
                <button class=" mx-3 btn btn-secondary">Cancel split</button>
            </div>

            <div class="section-header-description">
                <p class="text">Created by <b class="highlight"> Christopher Santana </b> • 99 tracks • 3hrs 30 min</p>
            </div>            
        </div>

        <div class="split-body">
            <div class="split-original" >
                <div class="split-original-header">
                    <span class="split-original-cell">#</span>
                    <span class="split-original-cell">Title</span>
                    <span class="split-original-cell">Duration</span>
                </div>

                    <ul class="split-original-body">
                        <draggable :list="playlist_og"
                            group="split"
                            :move="check"
                            @end="checkPayload"  multi-drag selected-class="track-selected">
                            <li class="split-original-row" v-for="(playlist,key) in playlist_og" 
                                :key="playlist.id" :data-id="playlist.id">
                                <span class="split-original-cell">{{playlist.id}}</span>
                                <span class="split-original-cell">{{playlist.title}}...</span>
                                <span class="split-original-cell">{{playlist.duration}}</span>
                            </li>
                        </draggable> 

                    </ul>


                <div class="split-controller">
                    <span class="label">Divide splaylists in</span>
                    <button class="split-btn active">2</button>
                    <button class="split-btn">3</button>
                    <button class="split-btn">4</button>
                </div>

            </div>

            <div class="splits-container">
                <h4 class="splits-header">
                    New playlists
                </h4>

                <div class="accordion">
                    <div class="accordion-btn">
                        <h3 class="accordion-title">House workout</h3>
                        <div>
                            <span class="accordion-info">
                                30 songs
                            </span>
                            <span class="accordion-info">
                                00:03
                            </span>
                        </div>
                    </div>

                    <ul class="accordion-body" >
                        <draggable :list="playlist_2" group="split"  @end="checkPayload" selected-class="track-selected"  multi-drag>
                            <li class='accordion-item'v-for="(playlist,key) in playlist_2" 
                                :key="playlist.id" :data-id="playlist.id">
                                <span class="accordion-cell">{{playlist.id}}</span>
                                <span class="accordion-cell">{{playlist.title}}</span>
                                <span class="accordion-cell">{{playlist.duration}}</span>
                            </li>
                        </draggable> 
                    </ul>
                </div>
            </div>


        </div>

        
    </section>
    
    
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import functions from '../../../spotify/function.js';
import  { Sortable, MultiDrag } from "sortablejs";
import draggable from '../../../vuedraggable'

// Sortable.mount(new MultiDrag());

// Sortable.mount(new MultiDrag())

export default {
    name: "split-overview",
    components:{
        draggable
    },
    data(){
        return {
                playlist_og:[
                    {id:1,
                    title: "So wrong",
                    duration:'4:30'},
                    {id:2,
                    title: "In the end",
                    duration:'4:30'},
                    {id:3,
                    title: "God damn",
                    duration:'2:30'},
                    {id:4,
                    title: "Many men",
                    duration:'1:25'},
                ],
                playlist_2:[
                    {id:1,
                    title: "Numb",
                    duration:'4:30'},
                    {id:2,
                    title: "Champain Bop",
                    duration:'4:30'}
                ]
        }
    },
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
        },
        check(evt){
            // console.log(evt)
        },
        checkPayload(evt){
            console.log(evt.to)
        }
    }
}
</script>