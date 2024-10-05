<script lang="ts">
    import { LEVEL_PROGRESSION } from "$lib/data/xp_progression";
    export let data;
</script>
<style>
    main {
        padding: .5rem;
        display: flex;
        flex-direction: column;
    }
    .header-section {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: .5rem;
    }
    .avatar {
        --size: 100px;
        height: var(--size);
        width: var(--size);
    }
    .username-and-level {
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
    .username {
        color: #fff;
        font-family: Roboto;
        font-weight: 100;
        margin: 0;
        padding: 0;
        font-size: 2rem;
		text-decoration: none;
    }
    .level-progress {
        display: flex;
        align-items: center;
        gap: .1rem;
        width: 100%;
        text-decoration: none;
        border: 1px solid transparent;
    }
    .level-progress > progress {
        height: 1.5rem;
        border: 0;
        width: 100%;
    }
    .level-progress:hover {
        border: 1px solid #00F;
    }
    .level-progress > span {
        color: #fff;
    }
    h2 {
        color: #fff;
    }
    h3 {
        color: #bbb;
    }
    .weapons-section {
        width: 100%;
    }
    .button-link-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .link-button:hover {
        background: #d0d0d0;
    }
    .link-button {
        background: #D9D9D9;
        padding: .1rem;
        width: 100%;
        height: 2rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        color: #000;
    }
    .hidden-link {
        text-decoration: none;
    }
</style>
<main>
    <section class="header-section">
        <img class="avatar" src={data.userInfo.avatar_url} alt="" />
        <div class="username-and-level">
            <a class="username" href={`/players/${data.userInfo.id}/username-history`}>{data.userInfo.display_name} <a class="hidden-link" href={`/players/${data.userInfo.id}/cards`}>✨</a></a>
            <a class="level-progress" href={`/players/${data.userInfo.id}/progression`}>
                <span>0</span>
                <progress max={1} value={data.userStats.progression.xp / LEVEL_PROGRESSION[LEVEL_PROGRESSION.length - 1]} />
                <span>50</span>
            </a>
        </div>
    </section>
    <section class="weapons-section">
        <h2>Weapons</h2>
        <h3>Primaries</h3>
        <div class="weapons-container button-link-container">
            {#each Object.keys(data.userStats.weapons.primary) as gunId}
                <a class="weapons-link link-button" href={`/players/${data.userInfo.id}/weapons/primary/${gunId}`}>{gunId}</a>
            {/each}
        </div>
        <h3>Secondary</h3>
        <div class="weapons-container button-link-container">
            {#each Object.keys(data.userStats.weapons.secondary) as gunId}
                <a class="weapons-link link-button" href={`/players/${data.userInfo.id}/weapons/secondary/${gunId}`}>{gunId}</a>
            {/each}
        </div>
        <h3>Utility</h3>
        <div class="weapons-container button-link-container">
            {#each Object.keys(data.userStats.weapons.utility) as utilityId}
                <a class="weapons-link link-button" href={`/players/${data.userInfo.id}/weapons/utility/${utilityId}`}>{utilityId}</a>
            {/each}
        </div>
        <h3>Melee</h3>
        <div class="weapons-container button-link-container">
            <a class="weapons-link link-button" href={`/players/${data.userInfo.id}/weapons/melee/kanto`}>kanto</a>
        </div>
    </section>
    <section class="maps-section">
        <h2>Maps</h2>
        <div class="maps-container button-link-container">
            {#each Object.keys(data.userStats.maps) as mapId}
                <a class="map-link link-button" href={`/players/${data.userInfo.id}/maps/${mapId}`}>{mapId}</a>
            {/each}
			<a class="map-link link-button" href={`javascript:location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'`}>flora</a>
        </div>
    </section>
    <section class="gamemodes-section">
        <h2>Gamemodes</h2>
        <div class="gamemodes-container button-link-container">
            {#each Object.keys(data.userStats.gamemodes) as gamemodeId}
                <a class="gamemode-link link-button" href={`/players/${data.userInfo.id}/gamemodes/${gamemodeId}`}>{gamemodeId.replaceAll("_", " ")}</a>
            {/each}
        </div>
    </section>
</main>
