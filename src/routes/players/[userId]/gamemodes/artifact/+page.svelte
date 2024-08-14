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
    h3 {
        color: #888;
    }
</style>
<main>
    <h1>Artifact</h1>
    <h2>Match results</h2>
    <p>Wins: {data.gamemodeStats.match_results.wins}</p>
    <p>Losses: {data.gamemodeStats.match_results.losses}</p>
    <p>Abandons: {data.gamemodeStats.match_results.abandons}</p>
    <h2>Round results</h2>
    <h3>Pistol rounds</h3>
    <p>Wins: {data.gamemodeStats.round_results.pistol_round.wins}</p>
    <p>Losses: {data.gamemodeStats.round_results.pistol_round.losses}</p>
    <h3>Reyab rounds</h3>
    <p>Wins: {data.gamemodeStats.round_results.reyab.wins}</p>
    <p>Losses: {data.gamemodeStats.round_results.reyab.losses}</p>
    <h2>Kills and Deaths</h2>
    <p>Aces: {data.gamemodeStats.kills_and_deaths.aces}</p>
    <p>Kills: {data.gamemodeStats.kills_and_deaths.kills}</p>
    <p>Assists: {data.gamemodeStats.kills_and_deaths.assists}</p>
    <p>Deaths: {data.gamemodeStats.kills_and_deaths.deaths}</p>
    <h2>Scanner</h2>
    <p>Times planted: {data.gamemodeStats.objective.scanner.plants}</p>
    <p>Times disabled: {data.gamemodeStats.objective.scanner.disables}</p>
</main>
