<script lang="ts">
    import ShotVisualizer from "./ShotVisualizer.svelte";
    import type { UserGunStats, UserWeaponStats } from "$lib/api";
    import { writable } from "svelte/store";
    export let data;
    
    const activeWeapon = writable<string>("mk418");
    const activeWeaponStats = writable<UserGunStats | UserWeaponStats | null>(null);

    activeWeapon.subscribe(async (newWeaponId) => {
        const userStats = await data.userStats;

        activeWeaponStats.set(userStats.weapons[newWeaponId]);
    });

</script>

{#await data.userInfo}
    <h1>Loading user info</h1>
{:then userInfo}
    <h1>{userInfo.name}'s stats</h1>
{:catch error}
    <h1>Unknown users's stats</h1>
{/await}
{#await data.userStats}
    <h2>Weapons</h2>
    <label for="select-active-weapon">Select weapon to view stats for</label>
    <select id="select-active-weapon" bind:value={$activeWeapon}>
        <option value="mk418">mk418</option>
    </select>
    <h3>Hits</h3>
    <ShotVisualizer stats={activeWeaponStats} />
{:then stats}
    <h2>Weapons</h2>
    <label for="select-active-weapon">Select weapon to view stats for</label>
    <select id="select-active-weapon" bind:value={$activeWeapon}>
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
