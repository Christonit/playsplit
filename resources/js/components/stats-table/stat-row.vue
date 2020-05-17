<template>
    <div class="stats-row">
        <span class=" text"> <slot name="feauture-name"></slot> </span>
        <div class="d-flex justify-content-between flex-wrap">
            <div class="stat-bar">
                <hr class="stat-position-tracker" :style="'left:'+ percentage + '%'">
            </div>
            <b class=" label text-left highlight"> <slot name="feauture-left-treshold"></slot> </b>
            <b class=" label text-right highlight"> <slot name="feauture-right-treshold"></slot> </b>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'stat-row',
    props:['featureValue','feature'],
    computed:{
        percentage(){
            if(this.feature == 'tempo' ){
                let min = 20;
                let max = 200;
                return ( (this.featureValue - min) * 100 / (max - min) );
            }
            return (this.featureValue * 100)
        }
    }
}
</script>