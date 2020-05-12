<template>

    
    <section id="split-playlist" class='action-container'>
        <div class="section-header">
            <h2 class="title">{{split.playlist.name}}</h2> 
            <div class="btn-container d-inline-flex align-items-center">
                <button class=" mx-3 btn btn-secondary" @click="clearSplit">Cancel split</button>
                <button class="btn btn-primary" @click="createSplit" :disabled="checkIfSplitEmpty">Save</button>
            </div>

            <div class="section-header-description">
                <p class="text">Created by <b class="highlight">{{split.playlist.owner.display_name}}</b> • {{playlist_og.length}} tracks • {{totalTime(playlist_og)}}</p>
                <div class="top-genres-container" v-if="top5Genres.length > 1">
                    <span class="pill" v-for="genre in top5Genres">{{genre}}</span>
                </div>
            </div>            
        </div>

        <div class="split-body" ref="split_body">
            <div class="split-original" >
                <div class="split-original-header">
                    <span class="split-original-cell">#</span>
                    <span class="split-original-cell">Title</span>
                    <span class="split-original-cell">Duration</span>
                </div>

                    <ul class="split-original-body" ref="og_playlist">
                        <draggable v-model="playlist_og"
                            :group="split_options"                           
                            multi-drag selected-class="track-selected"
                            :move="checkMove" 
                            @start="onStart"
                            @end="onEnd" 
                            >
                            <li class="split-original-row" v-for="(playlist,key) in playlist_og" 
                                :key="key" :data-id="playlist.track.id">
                                <span class="split-original-cell">{{key + 1}}</span>
                                <span class="split-original-cell">{{playlist.track.name}}...</span>
                                <span class="split-original-cell">{{minutesPrinter(playlist.track.duration_ms)}}</span>
                            </li>
                        </draggable> 

                    </ul>


                <div class="split-controller">
                    <span class="label">Divide splaylists in</span>

                    <button class="split-btn active"
                        @click="splitHeight(2)">2</button>

                    <button class="split-btn"
                        @click="splitHeight(3)" 
                        :class="(splits_active >= 3 ? 'active': '')">3</button>

                    <button class="split-btn" 
                    @click="splitHeight(4)"
                    :class="(splits_active == 4 ? 'active': '')">4</button>

                </div>

            </div>

            <div class="splits-container">
                <h4 class="splits-header">
                    New playlists
                </h4>

                <draggable v-model="playlist_2.content" group="split" draggable=".accordion-item"
                :move="checkMove" 
                @start="onStart" 
                @end="onEnd" 
                selected-class="track-selected"  multi-drag
                class="accordion" ref="playlist_2" id="playlist_2" data-name="House workout" data-open="true">
    
                    <div class='accordion-item' v-for="(playlist,key) in playlist_2.content" 
                        :key="key" :data-id="playlist.track.id" :data-key="key">
                        <span class="accordion-cell">{{key + 1}}</span>
                        <span class="accordion-cell">{{playlist.track.name}}</span>
                        <span class="accordion-cell">{{minutesPrinter(playlist.track.duration_ms)}}</span>
                    </div>

                    <div class="accordion-btn" slot="header" @click="accordionBtn" role="group" data-accordion="playlist_2">
                        <h3 class="accordion-title">
                            {{(splitPlaylistName.split_1 != '') ? splitPlaylistName.split_1 : 'Name 1'}}
                            <button class="material-icons split-edit" @click="toggleModal">
                            edit
                            </button>    
                        </h3>
                        <div>
                            <span class="accordion-info">
                                {{playlist_2.content.length}} tracks |
                            </span>
                            <span class="accordion-info">
                                {{ totalTime(playlist_2.content) }}
                            </span>
                        </div>
                    </div>
                </draggable> 
                    
                <draggable v-if="splits_active == 3 || splits_active == 4 "
                v-model="playlist_3.content" group="split" draggable=".accordion-item" 
                :move="checkMove" 
                @start="onStart"
                @end="onEnd"
                selected-class="track-selected"  multi-drag
                class="accordion" ref="playlist_3" id="playlist_3" data-name="House workout" data-open="false">
                    
                    <div class='accordion-item' v-for="(playlist,key) in playlist_3.content" 
                        :key="key" :data-id="playlist.track.id" :data-key="key">
                        <span class="accordion-cell">{{key + 1}}</span>
                        <span class="accordion-cell">{{playlist.track.name}}</span>
                        <span class="accordion-cell">{{minutesPrinter(playlist.track.duration_ms)}}</span>
                    </div>

                    <div class="accordion-btn" slot="header" @click="accordionBtn" data-accordion="playlist_3" role="group">
                        <h3 class="accordion-title" >

                            {{(splitPlaylistName.split_2 != '') ? splitPlaylistName.split_2 : 'Name 2'}}

                            <button class="material-icons split-edit" @click="toggleModal">
                            edit
                            </button>
                        </h3>

                        <div>
                            <span class="accordion-info">
                                {{playlist_3.content.length}} tracks |
                            </span>
                            <span class="accordion-info">
                                {{ totalTime(playlist_3.content) }}
                            </span>
                        </div>
                    </div>
                </draggable> 
                <draggable v-if="splits_active == 4"
                v-model="playlist_4.content" group="split" draggable=".accordion-item" 
                :move="checkMove" 
                @start="onStart"
                @end="onEnd"
                selected-class="track-selected"  multi-drag
                class="accordion" ref="playlist_4" id="playlist_4" data-name="House workout" data-open="false">
                    
                    <div class='accordion-item' v-for="(playlist,key) in playlist_4.content" 
                        :key="key" :data-id="playlist.track.id" :data-key="key">
                        <span class="accordion-cell">{{key + 1}}</span>
                        <span class="accordion-cell">{{playlist.track.name}}</span>
                        <span class="accordion-cell">{{minutesPrinter(playlist.track.duration_ms)}}</span>
                    </div>

                    <div class="accordion-btn" slot="header" @click="accordionBtn" data-accordion="playlist_4" role="group">
                        <h3 class="accordion-title" >
                            {{(splitPlaylistName.split_3 != '') ? splitPlaylistName.split_3 : 'Name 3'}}
                            <button class="material-icons split-edit" @click="toggleModal">
                            edit
                            </button>    
                        </h3>
                        <div>
                            <span class="accordion-info">
                                {{playlist_4.content.length}} tracks |
                            </span>
                            <span class="accordion-info">
                                {{ totalTime(playlist_4.content) }}
                            </span>
                        </div>
                    </div>
                </draggable> 

                <div id="split-footer" class="d-flex justify-content-end">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary active" @click="split_options.pull = true">
                        <input type="radio" name="options" id="option1"  checked> Move
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option2" @click="split_options.pull = 'clone'"> Copy
                    </label>
                  
                    </div>

                </div>
                
            </div>


        </div>

        <callout-bottom v-if="emptySplitNames" 
            class="alert bottom" 
            :has-close-btn="true" 
            @hideMessase="emptySplitNames = false">

            <span slot="message">Cannot create and upload a split without a name.</span>

        </callout-bottom>


        <edit-name v-if="playlist_4.modal" :emition="true" @saveName="nameHandle"></edit-name>
        <edit-name v-if="playlist_3.modal" :emition="true" @saveName="nameHandle"></edit-name>
        <edit-name v-if="playlist_2.modal" :emition="true" @saveName="nameHandle"></edit-name>

        
    </section>
    
    
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import functions from '../../../spotify/function.js';
import  { Sortable, MultiDrag } from "sortablejs";
import EditName from '../../modals/edit-name-split.vue';
import CalloutBottom from '../../utilities/callout-bottom.vue';

import draggable from '../../../vuedraggable'

// Sortable.mount(new MultiDrag());

// Sortable.mount(new MultiDrag())

export default {
    name: "split-overview",
    mounted(){
        this.playlist_og =  this.$store.state.split.playlist.tracks.items
        let elHeight = this.$refs.split_body.offsetHeight

        this.split_body_height = elHeight;

        this.$refs.og_playlist.style.maxHeight = (elHeight - (56*2)) + "px"
        this.setHeight()

        this.getPlaylistGenres(this.artistsIds).then( data => {
                
                let genres = JSON.parse(data) 
               return ( this.genres = genres.reverse());


        }).then( ()=>{

                for( var i = 0; i < 5; i++ ){
                    let genres = this.genres[i].split(":");

                    this.top5Genres.push(genres[0]);
                }

        });

        
    },
    components:{
        draggable,
        EditName,
        CalloutBottom
    },
    data(){
        return {
                splits_active:4,
                split_options:{name:'split',pull:true},
                split_body_height:0,
                playlist_og:[],
                isOpen:true,
                playlist_2:{
                    name:'',
                    content:[]
                },
                playlist_3:{
                    name:'',
                    content:[]
                },
                playlist_4:{
                    name:'Prueba',
                    content:[]
                },
                genres: null,
                top5Genres: [],
                emptySplitNames:false
        }
    },
    mixins:[functions],
    computed:{
        ...mapState(['split','isModalOpen','splitPlaylistName']),
        timePrinter(){
            let time = this.split.playlist.duration.hours;
            let hours = (time != 0 ? `${time} ${( time > 1 ? 'hours': 'hour')}`: '')
           
           return `${hours} ${this.split.playlist.duration.min} minutes`;

            
        },
        artistsIds(){
            let IDs = []
            this.playlist_og.forEach(playlist => {
                playlist.track.artists.forEach( artist => {
                    IDs.push(artist.id);
                })
            })

            return IDs;
        },

        checkIfSplitEmpty(){
            console.log('Init')
            
            if( this.splits_active == 2 & this.playlist_2.content.length == 0 ){
                console.log('2')

                return true;
            }
            
            if( this.splits_active == 3 & (this.playlist_2.content.length == 0 || this.playlist_3.content.length == 0) ){
                console.log('3')

                return true;
            }
            if( this.splits_active == 4 & (this.playlist_2.content.length == 0 || this.playlist_3.content.length == 0 || this.playlist_4.content.length == 0) ){
                console.log('3')
                return true;
            }
            
                console.log('end')

                return false;
            
        }
      

    },
    methods:{
        ...mapMutations(['clearSplit']),
        
        splitHeight(quantity){
           this.splits_active = quantity;
           this.setHeight();
        },
        clearSplit(){
            this.playlist_og = [];
            this.$store.commit('clearSplit');
        },
        toggleModal(e){
            let accordion_name = e.target.parentNode.parentNode.getAttribute("data-accordion");
                
            if(accordion_name == "playlist_4"){

                this.$store.commit('openCloseSplit3');
            }

            if(accordion_name == "playlist_3"){
                this.$store.commit('openCloseSplit2');
            }

            if(accordion_name == "playlist_2"){
                this.$store.commit('openCloseSplit1');
            }

            e.stopPropagation();

        },
        nameHandle(event){
            if(this.playlist_4.modal == true){

                this.playlist_4.name = event;
                this.playlist_4.modal = false;

            }
            if(this.playlist_3.modal == true){
                this.playlist_3.name = event;
                this.playlist_3.modal = false;

            }
            if(this.playlist_2.modal == true){
                this.playlist_2.name = event;
                this.playlist_2.modal = false;
            }

        },
        totalTime(playlist){
            let totalTimeMs = 0;
            let time = null

            playlist.forEach(item =>{
                totalTimeMs += item.track.duration_ms;
            })

            time = this.trackMsToHrs(totalTimeMs);
            if(time.hours < 1){
                return `${time.minutes} min`;
            }
            return `${time.hours} hr ${time.minutes} min`;
            
        }, 
        minutesPrinter(ms){
            let time = this.songMstoSeconds(ms);

            return `${time.min}:${time.sec}`;
        },
        fetchGenres(id){
            fetch(`${this.apiRoot}/tracks/${id}`,this._GET).then( res => res.text() ).then(data => {
                console.log(JSON.parse(data))
            });
        },
        checkMove(evt){
            // console.log(evt)
        },
        onStart(evt){

            let el = document.querySelectorAll('.accordion-item[data-key="0"]');
            if(el.length > 0){
                el.forEach(item =>{
                    item.classList.add('to-drop');
                })
                console.log('its true');
            }
          
        },
        onEnd(evt){

            let el = document.querySelectorAll('.accordion-item[data-key="0"]');
            if(el.length > 0){
                setTimeout( () =>{

                    el.forEach(item =>{

                        item.classList.remove('to-drop');

                    })
                console.log('Za warudo');

                },1000)
               
               
            }
          
        },
        accordionBtn(e){
            let el = e.target.getAttribute('data-accordion');

            let clickEl = document.getElementById(el);


            if( clickEl.getAttribute('data-open') == true ){

                return false;

            }



            let accordions = document.querySelectorAll('.accordion');

            if(accordions.length > 1){

                accordions.forEach(item => {

                    item.setAttribute('data-open',false)

                })

                clickEl.setAttribute('data-open', true)
                this.setHeight();
            }

            e.stopPropagation();
        },
        setHeight(){
            let el = document.querySelector('.accordion[data-open=true]');

            var accordions = document.querySelectorAll('.accordion');
            if(accordions.length > 1){
                let non_selected = document.querySelectorAll('.accordion[data-open=false]');

                non_selected.forEach(item => {
                    item.style.height = "52px"
                })

            }
            if(this.splits_active == 2){
                console.log(accordions.length)
                el.style.height = (this.split_body_height - (56 * 2)) + "px"
                
            }

            if(this.splits_active == 3){
                el.style.height = (this.split_body_height - (58.325* 3)) + "px"
               console.log(accordions.length)
            }
            if( this.splits_active == 4){
                console.log(accordions.length)
                el.style.height = (this.split_body_height - (59.75 * 4)) + "px"
            }


        },
        createSplit(){

            let split_name = [];
            let split_uris = [];

            if( this.splits_active == 2){
                if(this.splitPlaylistName.split_1 == ''){
                    return (this.emptySplitNames = true)
                }
                let split_1 = [];
                 this.playlist_2.content.forEach( item => {
                    split_1.push(item.track.uri)
                })
                split_name.push(this.splitPlaylistName.split_1)
                split_uris.push(split_1)         

            }
            if( this.splits_active == 3){
                if(this.splitPlaylistName.split_1 == '' || this.splitPlaylistName.split_2 == ''){
                    return (this.emptySplitNames = true)
                }

                let split_1 = [];
                let split_2 = [];

                split_name.push(this.splitPlaylistName.split_1)
                split_name.push(this.splitPlaylistName.split_2)
                

                this.playlist_2.content.forEach( item => {
                    split_1.push(item.track.uri)
                })
                this.playlist_3.content.forEach( item => {
                    split_2.push(item.track.uri)
                })

                split_uris.push(split_1,split_2)         


            }
            if( this.splits_active == 4){

                if(this.splitPlaylistName.split_1 == '' || this.splitPlaylistName.split_2 == '' || this.splitPlaylistName.split_3 == ''){
                    return (this.emptySplitNames = true)
                }

                let split_1 = [];
                let split_2 = [];
                let split_3 = [];

                split_name.push(this.splitPlaylistName.split_1)
                split_name.push(this.splitPlaylistName.split_2)
                split_name.push(this.splitPlaylistName.split_3)


                this.playlist_2.content.forEach( item => {
                    split_1.push(item.track.uri)
                })
                this.playlist_3.content.forEach( item => {
                    split_2.push(item.track.uri)
                })
                this.playlist_4.content.forEach( item => {
                    split_3.push(item.track.uri)
                })

                split_uris.push(split_1,split_2,split_3)



            }

            split_name.forEach((split, index) => {
                this.createPlaylist(split).then(id => {
                    this.addTracksToPlaylist(id,split_uris[index])
                }).then(()=>{
                    this.clearSplit();
                })
                // console.log(split);
                // console.log(split_uris[index]);

            });

            return split_name;
        },
        createPlaylist(split_name){
           return fetch(`https://api.spotify.com/v1/users/${this.$store.state.user.spotify_id}/playlists`,{
                method:'POST',
                headers:this.authorization,
                body:JSON.stringify({
                    name: split_name
                })
            })
            .then(response => {
                let status = response.status;
                if( status == 200 || status == 201 ){
                    return response.text()
                }else{

                }

            })
            .then(response => {
                let data = JSON.parse(response)
               
                return data.id

            })
        

        },
        addTracksToPlaylist(playlist_id,playlist_uris){
            //    This request add tracks payload to new playlist 
            return  fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,{
                    method:'POST',
                    headers:this.authorization,
                    body:JSON.stringify({
                        uris: playlist_uris 
                    })
                    }).then( res => {
                        let status = res.status;

                        // This condition gere is for what to do 
                        // after successfull track adding or error handling
                        if(status == 200 || status == 201){
                            
                            // Force rerender for last added playlist or force a page reload.

                        }

                    })
        }

    }
}
</script>