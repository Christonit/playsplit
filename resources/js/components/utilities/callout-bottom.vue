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
export default {
    name:'callout-bottom',
    props:{
    hasCloseBtn:{
        type:Boolean,
        default: false
    }
    },
    methods:{
        close(){
            this.$emit('hideMessase');
        }
    }
}
</script>