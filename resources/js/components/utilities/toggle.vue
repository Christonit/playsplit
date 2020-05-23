<template>
    <label for="toggle" class="toggle-label">
        <span class="mr-2">
            <slot name="title"></slot>
        </span>
        <button class="btn-toggle active" @click="toggle"> <hr/> </button>
    </label>
</template>

<script>
export default {
    name: 'toggle-btn',
    methods:{
        toggle(e){
            let el = e.target;
            if(el.classList.contains('active')){
                this.$emit('toggle',false)
                el.classList.remove('active')
            }else{
                el.classList.add('active')
                this.$emit('toggle',true)

            }

            e.stopPropagation();
        }
    }
}
</script>
