<script lang="ts">
	import ShotVisualizer from "$lib/elements/ShotVisualizer.svelte";
    import { WEAPON_ID_TO_PROGRESSION } from "$lib/data/skin_progression";

    export let data;

    let skinProgression = WEAPON_ID_TO_PROGRESSION[data.weaponId];
    let requiredHeadshots = Object.keys(skinProgression);
    let goldRequiredHeadshots = requiredHeadshots[requiredHeadshots.length - 1];
</script>
<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h1,h2,p {
        color: #fff;
    }
</style>

<main>
    <h1>{data.weaponId}</h1>
    <div class="stats-container">
        <p>Shots fired: {data.weaponStats.shots.total}</p>
        <p>Headshots: {data.weaponStats.shots.hits.head}</p>
        <p>Kills: {data.weaponStats.kills.total} ({data.weaponStats.kills.headshots} of them where headshots)</p>
        <p>Gold progress:</p>
        <progress max={1} value={data.weaponStats.kills.headshots / goldRequiredHeadshots} />
    </div>
    <h2>Shot hit rates</h2>
    <ShotVisualizer stats={data.weaponStats}/>
</main>
