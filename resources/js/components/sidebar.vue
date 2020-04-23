<template>
    <aside>

        <div class="nav-container">
            <a href="#" class="nav-item active">
                <i class="nav-item-icon playlist"></i>
                My playlists
            </a>
            <a href="#" class="nav-item ">
                <i class="nav-item-icon songs"></i>
                My songs
            </a>
        </div>

        <div class="playlist-playing-container">
            <div>
                <span class="legend">
                    NOW PLAYING
                </span>

                <div class="d-flex align-items-center justify-space-between">
                    <b>This is Romeo Santos</b>
                    <span>50/200</span>
                </div>
            </div>

            <img src="https://via.placeholder.com/220" alt="">
        </div>
    </aside>
</template>

<script>
    export default {
        name:'sidebar-comp',
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
