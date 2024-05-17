<script lang="ts">
    import type { UserInfo } from "$lib/api";
    import { APIClient } from "$lib/api";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { debounce } from "$lib/debounce";
    import './styles/global.css';
    
    const userPlaceholders = ["natix", "Frosty", "Pan", "Sandie"];
    const hoursSinceEpoch = Math.floor((new Date()).getTime() / 1000 / 60 / 60);
    const userPlaceholder = userPlaceholders[hoursSinceEpoch % userPlaceholders.length];

    const searchResults = writable<UserInfo[]>([]);
    let searchQuery = "";

    const apiClient = new APIClient(fetch);

    async function onSearchFieldChange(event: InputEvent) {
        if (searchQuery.trim() === "") {
            $searchResults = [];
        } else {
            searchResults.set(await apiClient.searchForUserByName(searchQuery));
        }
    }
</script>

<title>VAIL stats far from this world</title>
<meta name="description" content="View official vail stats for any vail user">
<link rel="stylesheet" href="global.css">

<div class="container">
    <!-- Use the global CSS font for the title -->
    <h1 class="global-font">Vail stats</h1>
    <p class="orbitron-font">Delivered to you from far outside this world.</p>

    <h1 class="orbitron-font">Search for user</h1>
    <form on:submit|preventDefault={() => {}}>
        <label class="orbitron-font" for="username-field">Username</label>
        <input id="username-field" class="orbitron-font" type="search" placeholder={userPlaceholder} on:input={debounce(onSearchFieldChange)} bind:value={searchQuery}>
    </form>

    <div class="users">
        {#each $searchResults as user}
            <button class="user" on:click={() => {goto(`/players/${user.id}`)}}>
                {user.name}
            </button>
        {/each}
    </div>
</div>

<style>
    /* Define font styles */
    .global-font {
        /* Use the font specified in global.css */
        font-family: 'Ailerons', sans-serif;
        /* Add any other styles if needed */
    }

    .orbitron-font {
        /* Use the Orbitron font */
        font-family: 'Orbitron', sans-serif;
        /* Add any other styles if needed */
    }
</style>
