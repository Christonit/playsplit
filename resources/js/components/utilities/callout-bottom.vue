<template>
    <div class="callout">
        <span class="material-icons icon">
            warning
        </span>

        <slot name="message" class="callout-message">

        </slot>

        <button v-if="hasCloseBtn" class="close material-icons" @click="close">close</button>

    </div>
    
</template>

<script>

import {mapMutations} from 'vuex';

export default {
    name:'callout-bottom',
    props:{
    hasCloseBtn:{
        type:Boolean,
        default: false
    },
    calloutName:{
        type:String,
        default:null
    }
    },
    methods:{
        ...mapMutations(['setAlert']),
        close(){
            if( this.calloutName == null){
                this.$emit('hideMessase');
            }
            if( this.calloutName == 'playback'){
                this.setAlert({name: 'playback', payload: false })

            }


        }
    }
}
</script>