<script lang="ts">
    export let data;
</script>
<style>
    h1, p {
        color: #fff;
    }
    h2 {
        color: #aaa;
    }
</style>
<main>
    <h1>One in the chamber</h1>
    <h2>Match results</h2>
    <p>Wins: {data.gamemodeStats.match_results.wins}</p>
    <p>Losses: {data.gamemodeStats.match_results.losses}</p>
    <p>Draws: {data.gamemodeStats.match_results.draws}</p>
    <p>Abandons: {data.gamemodeStats.match_results.abandons}</p>
    <h2>Kills and Deaths</h2>
    <p>Kills: {data.gamemodeStats.kills_and_deaths.kills}</p>
    <p>Assists: {data.gamemodeStats.kills_and_deaths.assists}</p>
    <p>Deaths: {data.gamemodeStats.kills_and_deaths.deaths}</p>
</main>
