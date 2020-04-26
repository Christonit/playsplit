<template>
    <section id="playlists-list" class='section-container'>
            <div class="section-header">
                <h2 class="title">My playlists</h2>
                <div class="btn-container d-inline-flex align-items-center">
                    <button class=" mx-3 btn btn-secondary">Cancel merge</button>
                    
                    <div class="view-type-toggle">
                        <button class="material-icons">view_list</button>
                        <button class="material-icons">view_module</button>
                    </div>
                </div>
                
            </div>

            <div class="section-body">
                <grid-item></grid-item>

                <div class="grid-list-item to-merge">
                    <div class="grid-list-img">
                        <img src="https://via.placeholder.com/88" alt="Playlist title - cover">
                        <button class="btn-play material-icons">
                            play_arrow
                        </button>
                    </div>
                    <div class="grid-cell">
                        <a href='#' class="grid-list-heading">Hate it or love it</a>
                        <span class="grid-list-text">New age, synthwave, hip hop...</span>
                    </div>


                    <div class="grid-cell">
                        <span class="grid-list-text">172 songs</span>
                    </div>
                    <div class="grid-cell">
                        <span class="grid-list-text">3 hours 25 min</span>
                    </div>

                    <div class="grid-actions-container">
                        
                        <label for="toggle" class="toggle-label">
                            Preserve
                            <button class="btn-toggle active"> <hr/> </button>
                        </label>
                        <div class="btn-container">
                            <button>merge</button>
                            <button>split</button>
                        </div>
                        <span  class="material-icons btn-options">more_horiz</span>
                    </div>
                </div>

               
            </div>

            <div id="quickmerge">
                <div class="merge-info-review">
                    <span class="merge-title">Type playlist name</span> 
                    <p class="text mb-0"><span class="highlight">Select one more playlit</span> | 127 songs, 3:25 durations</p>
                </div>
                <div class="btn-container">
                    <button class="btn btn-secondary">Clear selected</button>
                    <button class="btn btn-primary">Merge</button>
                </div>
            </div>

        </section>
</template>

<script>

import GridItem from './grid-item.vue';

export default {
    name:'playlist-dashboard',
    components:{
        GridItem
    }
}
</script>