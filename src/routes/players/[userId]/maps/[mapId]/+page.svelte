<script lang="ts">
    export let data;
</script>

<style>
    h1, p {
        color: #fff;
    }
</style>

<main>
    <h1>{data.mapId}</h1>
    <p>Wins: {data.mapStats.match_results.wins}</p>
    <p>Losses: {data.mapStats.match_results.losses}</p>
    <p>Draws: {data.mapStats.match_results.draws}</p>
    <p>Abandons: {data.mapStats.match_results.abandons}</p>
</main>

