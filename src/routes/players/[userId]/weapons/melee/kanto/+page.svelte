<script lang="ts">
    import { WEAPON_ID_TO_PROGRESSION } from "$lib/data/skin_progression";
    export let data;
    let skinProgression = WEAPON_ID_TO_PROGRESSION.kanto;
    let requiredHeadshots = Object.keys(skinProgression);
    let goldRequiredHeadshots = requiredHeadshots[requiredHeadshots.length - 1];

    console.log(data);
</script>
<div>
    <h1>Kanto</h1>
    <h2>Kills</h2>
    <p>Kills: {data.meleeStats.kanto.kills.total} ({data.meleeStats.kanto.kills.headshots} of them where headshots)</p>
    <p>Gold progress:</p>
    <progress max={1} value={data.meleeStats.kanto.kills.headshots / goldRequiredHeadshots} />
    <h2>Throws</h2>
    <p>Kills while throwing: {data.meleeStats.total.kills.throwing.total}</p>
    <p>Longest throwing kill: {data.meleeStats.total.kills.throwing.longest_throw}</p>
</div>
<style>
    h1,h2,p {
        color: #fff;
    }
</style>
