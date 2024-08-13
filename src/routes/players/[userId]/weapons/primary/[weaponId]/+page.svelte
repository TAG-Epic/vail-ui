<script lang="ts">
	import ShotVisualizer from "$lib/elements/ShotVisualizer.svelte";

    export let data;
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
    <p>Shots fired: {data.weaponStats.shots.total}</p>
    <p>Headshots: {data.weaponStats.kills.headshots}</p>
    <p>Kills: {data.weaponStats.kills.total}</p>
    <p>Gold progress:</p>
    <progress max={100} value={50} />
    <h2>Shot hit rates</h2>
    <ShotVisualizer stats={data.weaponStats}/>
</main>
