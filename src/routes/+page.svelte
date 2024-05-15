<script lang="ts">
    import type { UserInfo } from "$lib/api";
    import { APIClient } from "$lib/api";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { debounce } from "$lib/debounce";
    const userPlaceholders = [
        "natix",
        "Frosty",
        "Pan",
        "Sandie"
    ];

    const hoursSinceEpoch = Math.floor((new Date()).getTime() / 1000 / 60 / 60);
    const userPlaceholder = userPlaceholders[hoursSinceEpoch % userPlaceholders.length];

    const searchResults = writable<UserInfo[]>([]);
    let searchQuery = "";

    const apiClient = new APIClient(fetch);

    async function onSearchFieldChange(event: InputEvent) {
        if (searchQuery.trim() === "") {
            $searchResults = [];
        } else {
            $searchResults = await apiClient.searchForUserByName(searchQuery);
        }
    }
</script>

<style>
    .users {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin: .5rem;
    }
    .user {
        width: 10rem;
        height: 2rem;
        border: 1px solid #000;

        background: inherit;
        text-align: left;
    }
    .user:hover {
        color: #555;
    }

</style>

<svelte:head>
    <title>Vail stats far from this world</title>
    <meta name="description" content="View official vail stats for any vail user">
</svelte:head>

<h1>Vail stats</h1>
<p>Delivered to you from far outside this world.</p>

<h1>Search for user</h1>
<form on:submit|preventDefault={() => {}}>
    <label for="username-field">Username</label>
    <br/>
    <input id="username-field" type="search" placeholder={userPlaceholder} on:input={debounce(onSearchFieldChange)} bind:value={searchQuery}>
</form>

<div class="users">
    {#each $searchResults as user}
        <button class="user" on:click={() => {goto(`/players/${user.id}`)}}>
            {user.name}
        </button>
    {/each}
</div>
