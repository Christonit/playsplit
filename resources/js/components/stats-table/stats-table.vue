<template>
    <div id="music-stats">
        <h3 class="subtitle">Playlists stats</h3>

        <div class="stats-table">
            <stat-row></stat-row>
        </div>
    </div>
</template>

<script>

import StatRow from './stat-row.vue';
export default {
    name:'stats-table',
    components:{
        StatRow
    }
}
</script>