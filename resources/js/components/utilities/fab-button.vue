<template>
    <button class="btn btn-primary fab" 
        @click="open">

        <span class="material-icons mr-2">
            menu
        </span>

        Open sidebar
    </button>
</template>

<script>
export default {
    name:"fab-button",
    data(){
        return {

        }
    },
    mounted(){

    },
    methods:{
        open(){
            this.$store.commit('toggleSidebarMobile',true);
        }
    }
    
}
</script>