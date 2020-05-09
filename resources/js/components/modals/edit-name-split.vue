<template>

    <div class="pop-up">
        <div class="pop-up-content small">
            <div class="pop-up-header">
                <h3 class="subtitle text-center">Edit playlist name</h3>

                <button class="close material-icons" @click="closeModal">close</button>
            </div>
            <div class="pop-up-body app-form">

                <input type="text" name="playlist-name" class="input input-large my-0" v-model="name"/>

                <div class="btn-container mt--32 w-100">
                    <button class="btn btn-primary" @click="saveName">Save changes</button>
                </div>

            </div>
        </div>

        <div class="pop-up-overlay" @click="closeModal"></div>

    </div>

</template>
<script>
export default {
    name:"edit-name",
    data(){
        return {
            name:''
        }
    },
    props:{
    commitName:{
        type:String
    }, 
    emition:{
        type:Boolean, 
        default: false
        }
    },
    mounted(){
    },
    methods:{
        closeModal(){
            this.$store.commit('openCloseModal',0)
        },
        saveName(){
            if( this.emition == false){
                
                this.$store.commit(this.commitName,this.name)
                this.$store.commit('openCloseModal',0)
            }

            if(this.emition == true){
                this.$emit('saveName', this.name)
            }

            this.name = ''            

        }
    }
}
</script>