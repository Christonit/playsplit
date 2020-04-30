<template>
    <div id="quickmerge">
                <div class="merge-info-review">
                    <span class="merge-title" @click="openModal">Type playlist name</span> 
                    <p class="text mb-0"><span class="highlight">Select one more playlit</span> | 127 songs, 3:25 durations</p>
                </div>
                <div class="btn-container">
                    <button class="btn btn-secondary">Clear selected</button>
                    <button class="btn btn-primary">Merge</button>
                </div>
    </div>
</template>

<script>
export default {
    name:'quickmerge',
    methods:{
        openModal(){
            this.$store.commit('openCloseModal',0)
        }
    }
}
</script>