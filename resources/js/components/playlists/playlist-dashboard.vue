<template>
    <section id="playlists-list" class='section-container'>
            <div class="section-header">
                <h2 class="title">My playlists</h2>
                <div class="btn-container">
                    <div class="view-type-toggle">
                        <button class="material-icons">view_list</button>
                        <button class="material-icons">view_module</button>
                    </div>
                </div>
                
            </div>

            <div class="section-body">
                <grid-item></grid-item>
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