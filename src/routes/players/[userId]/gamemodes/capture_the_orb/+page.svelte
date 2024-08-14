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
    <h1>Capture the Orb</h1>
    <h2>Match results</h2>
    <p>Wins: {data.gamemodeStats.match_results.wins}</p>
    <p>Losses: {data.gamemodeStats.match_results.losses}</p>
    <p>Draws: {data.gamemodeStats.match_results.draws}</p>
    <p>Abandons: {data.gamemodeStats.match_results.abandons}</p>
    <h2>Kills and Deaths</h2>
    <p>Kills: {data.gamemodeStats.kills_and_deaths.kills}</p>
    <p>Kills while holding the orb: {data.gamemodeStats.kills_and_deaths.kills_as_orb_carrier}</p>
    <p>Kills on orb carrier: {data.gamemodeStats.kills_and_deaths.kills_on_orb_carrier}</p>
    <p>Assists: {data.gamemodeStats.kills_and_deaths.assists}</p>
    <p>Deaths: {data.gamemodeStats.kills_and_deaths.deaths}</p>
    <h2>Orb</h2>
    <p>Steals: {data.gamemodeStats.objective.orb.steals}</p>
    <p>Captures: {data.gamemodeStats.objective.orb.captures}</p>
    <p>Recovers: {data.gamemodeStats.objective.orb.recovers}</p>
</main>
