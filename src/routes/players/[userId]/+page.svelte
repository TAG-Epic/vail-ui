<!-- Shot CSS file-->
<script lang="ts">
    import ShotVisualizer from "$lib/elements/ShotVisualizer.svelte";
    import type { UserGunStats, UserWeaponStats } from "$lib/api";
    import { writable } from "svelte/store";
    import { createCombinationVirtualGun } from "$lib/virtual_gun";

    export let data;
    
    const activeWeapon = writable<string>("total");
    const activeWeaponStats = writable<UserGunStats | UserGunStats[] | UserWeaponStats | null>(null);

    activeWeapon.subscribe(async (newWeaponId) => {
        const userStats = await data.userStats;

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
    <meta name="description" content={`View how ${data.userInfo.name} is performing in Vail quick play`}>
    <meta name="og:image" content={`/.internal/open-graph/player-stats/${data.userInfo.id}.png`}>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        body {
            background: radial-gradient(circle at 20% 20%, #1a1a1a, #000 70%), 
                        radial-gradient(circle at 80% 80%, #1a1a1a, #000 70%);
            background-size: cover;
            font-family: 'Orbitron', sans-serif;
            color: #ffffff; /* White text color */
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-align: center;
            color: #ffffff; /* White header text color */
        }

        h2 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: #ffffff; /* White header text color */
        }

        h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: #ffffff; /* White header text color */
        }

        p {
            text-align: center;
            margin-bottom: 2rem;
            color: #ffffff; /* White paragraph text color */
        }

        label {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            color: #ffffff; /* White label text color */
        }

        select {
            font-size: 1rem;
            background-color: #fff; /* White background */
            border: 1px solid #ccc; /* Light gray border */
            border-radius: 4px;
            padding: 0.5rem;
            margin-bottom: 1rem;
        }

        /* Style for the pie chart */
        pie-chart {
            width: 300px;
            height: 300px;
            margin-top: 2rem;
        }
    </style>
</svelte:head>

<div class="container">
    <h1>{data.userInfo.name}'s stats</h1>
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
        <!-- Placeholder for the pie chart -->
        <svg class="pie-chart" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Draw the pie chart here -->
        </svg>
    {:catch error}
        <h1>Weapons</h1>
        <p>Seems like the stats API is having some trouble. Maybe check back later?</p>
        <p>Error code: {error.code}</p>
        <p>Details: {error.details}</p>
    {/await}
</div>
