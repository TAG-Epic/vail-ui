<script lang="ts">
    import type { UserInfo } from "$lib/api/types";
    import { searchForUserByName } from "$lib/api";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { debounce } from "$lib/debounce";
    
    export let data;

    const userPlaceholders = [
        "natix",
        "Frosty",
        "Pan",
        "Sandie",
        "flyingdutchman.coc",
        "Prodigies",
        "RICHDGEB",
        "n0ch"
    ];

    const hoursSinceEpoch = Math.floor((new Date()).getTime() / 1000 / 60 / 60);
    const userPlaceholder = userPlaceholders[hoursSinceEpoch % userPlaceholders.length];

    const searchResults = writable<UserInfo[]>([]);
    let searchQuery = "";

    async function onSearchFieldChange(event: InputEvent) {
        if (searchQuery.trim() === "") {
            $searchResults = [];
        } else {
            $searchResults = await searchForUserByName(searchQuery);
        }
    }
</script>

<style>
    .main-content-placer {
        display: grid;
        place-items: center;
    }
    .main-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .main-sub-title {
        font-family: "Orbitron";
        color: #fff;
        font-size: 1.1rem;

    }
    .search-user-title {
        font-family: "Ailerons";
        color: #fff;
        font-size: 2.5rem;
    }
    label[for="username-field"] {
        display: inline-block;
        width: 100%;

        color: #fff;
        text-align: center;
        font-size: 1.5rem;
    }
    #username-field {
        height: 3rem;
        width: 100%;
        background: #000;
        color: #ccc;
    }
    .users {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin: .5rem;
    }
    .user {
        width: 15rem;
        line-height: 2.5rem;
        border: 1px solid #000;
        display: block;
        background: linear-gradient(45deg, rgba(72, 61, 139, 1), rgba(75, 0, 130, 1));
        color: #ccc;
        text-decoration: none;
        text-align: center;
        border-radius: 5px;
    }
    .user:hover {
        box-shadow: 0 0 20px rgba(75, 0, 130, 0.7);
        background: linear-gradient(45deg, rgba(72, 61, 139, 1), rgba(75, 0, 130, 1));
    }
    .user:active {
        box-shadow: 0 0 20px rgba(75, 0, 130, 0.7);
    }

</style>

<svelte:head>
    <title>VAIL Tracker</title>
    <meta name="description" content="Track the official stats of all VAIL users in real-time">
</svelte:head>

<div>
    <div class="main-content-placer">
        <div class="main-content">
            <div class="title">
                {#await data.userCount}
                    <p class="main-sub-title">Tracking the stats of 50000+ vail users</p>
                {:then userCount}
                    <p class="main-sub-title">Tracking the stats of {userCount} vail users</p>
                {:catch}
                    <p class="main-sub-title">Tracking the stats of 50000+ vail users</p>
                {/await}
            </div>
            
            <div class="user-search">
                <h1 class="search-user-title">Search for user</h1>
                <form on:submit|preventDefault={() => {}}>
                    <label for="username-field">Username</label>
                    <br/>
                    <input id="username-field" type="search" placeholder={userPlaceholder} on:input={debounce(onSearchFieldChange)} bind:value={searchQuery}>
                </form>

                <div class="users">
                    {#each $searchResults as user}
                        <a class="user" href={`/players/${user.id}`}>
                            {user.display_name}
                        </a>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>
