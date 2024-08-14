<script lang="ts">
    export let data;
</script>
<style>
    h1, p {
        color: #fff;
    }
</style>

<main>
    <h1>{data.weaponId}</h1>
    <p>Kills: {data.weaponStats.kills.total}</p>
</main>
