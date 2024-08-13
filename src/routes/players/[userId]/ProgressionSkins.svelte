<script lang="ts">
	import type { UserStats } from "$lib/api";
    import GUN_GRAPHS from "./gun-graphs.json";

    export let stats: UserStats;

    // Progression config
    let shotGunRequirements: number[] = [];
    let rifleRequirements: number[] = [
        25, // Fume
        50, // Verde
        75, // Edgerunner
        100, // Friskee
        125, // Saxe
        150, // Digicam
        175, // Sandstorm
        200, // Crounching tiger
        250, // Smoke runner
        300, // Grid locked
        350, // Data heist
        400, // Coldlink
        450, // Glyphosate
        500, // Overload
        550, // Primordial
        600, // Tempered
        700, // Damascus
        800, // Vacuga Xoog
        900, // Void Shifter
        1000, // 24 Karat
    ];
    let smgRequirements = [
        20, // Fume
        40, // Verde
        60, // Edgerunner
        80, // Friskee
        100, // Saxe
        120, // Digicam
        140, // Sandstorm
        160, // Crounching tiger
        200, // Smoke runner
        240, // Grid locked
        280, // Data heist
        320, // Coldlink
        360, // Glyphosate
        400, // Overload
        440, // Primordial
        480, // Tempered
        560, // Damascus
        640, // Vacuga Xoog
        720, // Void Shifter
        800, // 24 Karat
    ];

    let 

    weaponRequirements: Record<string, Record<number, string>> = {
        "mk418": GUN_GRAPHS[1000],
        "apc9pro": GUN_GRAPHS[800],
        "mr96": GUN_GRAPHS[600],
        "ak303n": GUN_GRAPHS[1000],
        "vityaz": GUN_GRAPHS[800],
        "m2rifled": GUN_GRAPHS[600],
        "ump45": GUN_GRAPHS[800],
        "g28z": GUN_GRAPHS[1000],
        "grotb": GUN_GRAPHS[1000],
        "stf12": GUN_GRAPHS[600],
        "vector45": GUN_GRAPHS[800],
        "ak12": GUN_GRAPHS[1000],
        "scarh": GUN_GRAPHS[1000],
        "g17": GUN_GRAPHS[400],
        "pl14": GUN_GRAPHS[400],
        "mk23": GUN_GRAPHS[400],
        "pm9": GUN_GRAPHS[400],
        "deagle": GUN_GRAPHS[400],
        "kanto": GUN_GRAPHS[1000]
    };
</script>
<style>
    .weapons-container {
        width: 100vw;
    }
    .weapons {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 100%;
        overflow: scroll;
    }
    .weapon {
        height: 20rem;
        min-width: 20rem;
        max-width: 20rem;
        background: #333;
    }
    .weapon-name {
        color: #fff;
        font-size: 2rem;
        text-align: center;
        width: 100%;
        display: block;
    }
    .weapon-skin {
        height: 12rem;
        width: auto;
    }
    .gold-progress-label {
        color: #fff;
    }
</style>

<div class="weapons-container">
    <div class="weapons">
        {#each Object.keys(stats.weapons.primary) as weaponName}
            {@debug weaponName}
            {@const weapon = stats.weapons.primary[weaponName]}
            {@const progressionRequirements = weaponRequirements[weaponName]}
            {@const progressionSteps = Object.keys(progressionRequirements)}
            <div class="weapon">
                <span class="weapon-name">{weaponName}</span>
                <hr/>
                <img class="weapon-skin" src={`/assets/weapons/${weaponName}.jpg`} alt="">
                <hr/>
                <label class="gold-progress-label" for={`weapon-progression-${weaponName}-gold-progress`}>Gold progress</label>
                <progress id={`weapon-progression-${weaponName}-gold-progress`} max={progressionSteps[progressionSteps.length - 1]} value={weapon.kills.headshot_kills}>
            </div>
        {/each}
    </div>
</div>
