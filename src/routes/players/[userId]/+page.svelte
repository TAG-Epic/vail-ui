<script lang="ts">
    import ShotVisualizer from "$lib/elements/ShotVisualizer.svelte";
    import ProgressionSkins from "./ProgressionSkins.svelte";
    import type { UserGunStats, UserWeaponStats } from "$lib/api";
    import { writable } from "svelte/store";
    import { createCombinationVirtualGun } from "$lib/virtual_gun";

    export let data;
    
    const activeWeapon = writable<string>("total");
    const activeWeaponStats = writable<UserGunStats | UserGunStats[] | UserWeaponStats | null>(null);

    activeWeapon.subscribe(async (newWeaponId) => {
        const userStats = await data.userStats;
        
        if (userStats === undefined) {
            return;
        }

        if (newWeaponId === "total") {
            const guns = Object.values(userStats.weapons).filter(weapon => weapon.shots !== undefined);
            activeWeaponStats.set(createCombinationVirtualGun(guns));
        } else {
            activeWeaponStats.set(userStats.weapons[newWeaponId]);
        }

    });

</script>
<svelte:head>
    <title>{data.userInfo.name}'s stats</title>
    <meta name="description" content={`View how ${data.userInfo.name} is performing in VAIL VR quick play`}>
    <meta name="og:image" content={`/.internal/open-graph/player-stats/${data.userInfo.id}.png`}>
</svelte:head>

<style>
    label, h1, h2, h3 {
        color: #fff;
    }
    .main-title {
        font-family: "Orbitron";
        font-size: 3rem;
    }
    .weapons-section > h2 {
        font-family: "Orbitron";
        font-size: 2rem;
    }
</style>

<div>
    <h1 class="main-title">{data.userInfo.name}'s stats</h1>
    <section class="weapons-section">
        {#await data.userStats}
            <h2>Weapons</h2>
            <label for="select-active-weapon">Select weapon to view stats for</label>
            <select id="select-active-weapon" bind:value={$activeWeapon}>
                <option value="total">total</option>
            </select>
            <h3>Hits</h3>
            <ShotVisualizer stats={activeWeaponStats} />
        {:then stats}
            <h2>Weapons</h2>
            <label for="select-active-weapon">Select weapon to view stats for</label>
            <select id="select-active-weapon" bind:value={$activeWeapon}>
                <option value="total">total</option>
                {#each Object.keys(stats.weapons) as weaponId}
                    <option value={weaponId}>{weaponId}</option>
                {/each}
            </select>
            <h3>Hits</h3>
            <ShotVisualizer stats={activeWeaponStats} />
        {:catch error}
            <h1>Weapons</h1>
            <p>Seems like the stats API is having some trouble. Maybe check back later?</p>
            <p>Error code: {error.code}</p>
            <p>Details: {error.details}</p>
        {/await}
    </section>
    <section class="progression-skins-section">
        <h2>Skins</h2>
        <h3>Progression skins</h3>
        {#await data.userStats then stats}
            <ProgressionSkins stats={stats} />
        {:catch error}
            <p>Seems like the stats API is having some trouble. Maybe check back later?</p>
            <p>Error code: {error.code}</p>
            <p>Details: {error.details}</p>
        {/await}
    </section>
</div>
