<template>
    <div class="grid-list-item">
        <div class="grid-list-img">
            <img src="https://via.placeholder.com/88" alt="Playlist title - cover">
            <button class="btn-play material-icons">
                play_arrow
            </button>
        </div>
        <div class="grid-cell">
            <a href='#' class="grid-list-heading">Hate it or love it</a>
            <span class="grid-list-text">New age, synthwave, hip hop...</span>
        </div>


        <div class="grid-cell">
            <span class="grid-list-text">172 songs</span>
        </div>
        <div class="grid-cell">
            <span class="grid-list-text">3 hours 25 min</span>
        </div>

        <div class="grid-actions-container">
            <div class="btn-container">
                <button>merge</button>
                <button>split</button>
            </div>
            <span  class="material-icons btn-options">more_horiz</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'grid-item'
}
</script>