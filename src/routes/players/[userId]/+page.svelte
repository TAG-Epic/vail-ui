<script lang="ts">
    import ShotVisualizer from "./ShotVisualizer.svelte";
    import type { UserGunStats, UserWeaponStats } from "$lib/api";
    import { writable } from "svelte/store";
    export let data;
    
    const activeWeapon = writable<string>("total");
    const activeWeaponStats = writable<UserGunStats | UserGunStats[] | UserWeaponStats | null>(null);

    activeWeapon.subscribe(async (newWeaponId) => {
        const userStats = await data.userStats;

        if (newWeaponId === "total") {
            const guns = Object.values(userStats.weapons).filter(weapon => weapon.shots !== undefined);
            const virtualGun = {
                kills: {
                    headshot_kills: guns.reduce((accumulator, weapon) => {return accumulator + weapon.kills.headshot_kills}, 0),
                    total: guns.reduce((accumulator, weapon) => {return accumulator + weapon.kills.total}, 0),
                },
                shots: {
                    fired: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.fired}, 0),
                    hits: {
                        head: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.head}, 0),
                        body: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.body}, 0),
                        arm: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.arm}, 0),
                        leg: guns.reduce((accumulator, weapon) => {return accumulator + weapon.shots.hits.leg}, 0),
                    },
                }
            };
            activeWeaponStats.set(virtualGun);
        } else {
            activeWeaponStats.set(userStats.weapons[newWeaponId]);
        }

    });

</script>
<svelte:head>
    <title>{data.userInfo.name}'s stats</title>
    <meta name="description" content={`View how ${data.userInfo.name} is performing in vail quick play`}>
</svelte:head>

<h1>{data.userInfo.name}'s stats</h1>
{#await data.userStats}
    <h2>Weapons</h2>
    <label for="select-active-weapon">Select weapon to view stats for</label>
    <select id="select-active-weapon" bind:value={$activeWeapon}>
        <option value="total" default>total</option>
    </select>
    <h3>Hits</h3>
    <ShotVisualizer stats={activeWeaponStats} />
{:then stats}
    <h2>Weapons</h2>
    <label for="select-active-weapon">Select weapon to view stats for</label>
    <select id="select-active-weapon" bind:value={$activeWeapon}>
        <option value="total" default>total</option>
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
