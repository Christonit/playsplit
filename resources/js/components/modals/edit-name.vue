<template>

    <div class="pop-up">
        <div class="pop-up-content small">
            <div class="pop-up-header">
                <h3 class="subtitle text-center">Edit playlist name</h3>

                <button class="close material-icons" @click="openModal">close</button>
            </div>
            <div class="pop-up-body app-form">

                <input type="text" name="playlist-name" class="input input-large my-0"/>

                <div class="btn-container mt--32 w-100">
                    <button class="btn btn-primary">Save changes</button>
                </div>

            </div>
        </div>

        <div class="pop-up-overlay" @click="openModal"></div>

    </div>

</template>
<script>
export default {
    name:"edit-name-pop-up",
    methods:{
        openModal(){
            this.$store.commit('openCloseModal',0)
        }
    }
}
</script>