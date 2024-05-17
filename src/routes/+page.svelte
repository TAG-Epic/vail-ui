<script lang="ts">
    import type { UserInfo } from "$lib/api";
    import { APIClient } from "$lib/api";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { debounce } from "$lib/debounce";
    
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

<svelte:head>
    <title>VAIL stats far from this world</title>
    <meta name="description" content="View official vail stats for any vail user">
    <style>
        @font-face {
            font-family: 'Ailerons';
            src: url('/src/fonts/Ailerons-Typeface.otf') format('opentype');
            font-weight: 400;
            font-style: normal;
        }

        body {
            background: radial-gradient(circle at 20% 20%, #1a1a1a, #000 70%), 
                        radial-gradient(circle at 80% 80%, #1a1a1a, #000 70%);
            background-size: cover;
            font-family: 'Ailerons', sans-serif;
            color: #ffffff; /* White text color */
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        h1 {
            font-size: 3.5rem; /* Slightly bigger text */
            font-weight: 400; /* Thinner text */
            margin-bottom: 1rem;
            text-align: center;
            color: #ffffff; /* White header text color */
        }

        p {
            font-size: 1.2rem; /* Slightly bigger text */
            font-weight: 300; /* Thinner text */
            text-align: center;
            margin-bottom: 2rem;
            color: #ffffff; /* White paragraph text color */
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 2rem;
        }

        label {
            font-size: 1.6rem; /* Slightly bigger text */
            font-weight: 300; /* Thinner text */
            margin-bottom: 0.5rem;
            color: #ffffff; /* White label text color */
        }

        #username-field {
            padding: 0.5rem;
            font-size: 1.2rem; /* Slightly bigger text */
            width: 300px;
            border: 2px solid #ffffff; /* White border color */
            border-radius: 4px;
            font-family: 'Ailerons', sans-serif;
            font-weight: 300; /* Thinner text */
            color: #ffffff; /* White text color */
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
        }

        .users {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .user {
            width: 200px;
            padding: 1rem;
            border: none;
            background: linear-gradient(45deg, rgba(72, 61, 139, 0.8), rgba(75, 0, 130, 0.8)); /* Shades of blue and purple */
            color: #ffffff; /* White text color */
            font-size: 1rem;
            text-align: center;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 0 15px rgba(75, 0, 130, 0.5); /* Purple glow */
        }

        .user:hover {
            background: linear-gradient(45deg, rgba(72, 61, 139, 1), rgba(75, 0, 130, 1)); /* More intense shades on hover */
            box-shadow: 0 0 20px rgba(75, 0, 130, 0.7); /* More intense glow on hover */
        }
    </style>
</svelte:head>

<div class="container">
    <h1>Vail stats</h1>
    <p>Delivered to you from far outside this world.</p>

    <h1>Search for user</h1>
    <form on:submit|preventDefault={() => {}}>
        <label for="username-field">Username</label>
        <input id="username-field" type="search" placeholder={userPlaceholder} on:input={debounce(onSearchFieldChange)} bind:value={searchQuery}>
    </form>

    <div class="users">
        {#each $searchResults as user}
            <button class="user" on:click={() => {goto(`/players/${user.id}`)}}>
                {user.name}
            </button>
        {/each}
    </div>
</div>
