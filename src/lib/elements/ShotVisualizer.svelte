<script lang="ts">
    import type { UserGunStats, UserWeaponStats } from "$lib/api";
    export let stats: writable<UserGunStats | UserWeaponStats | null>;

    type HitRates = {
        head: number | null;
        body: number | null;
        arm: number | null;
        leg: number | null;
    };

    function getHitRates(stats: UserGunStats | UserWeaponStats | null): HitRates {
        if (stats === null || stats.shots == undefined) {
            return {
                head: null,
                body: null,
                arm: null,
                leg: null
            };
        }
        const hits = stats.shots.hits;
        const totalHits = Object.values(hits).reduce((accumulator, value) => accumulator + value, 0);

        return {
            head: parseFloat(hits.head) / totalHits,
            body: parseFloat(hits.body) / totalHits,
            arm: parseFloat(hits.arm) / totalHits,
            leg: parseFloat(hits.leg) / totalHits,
        };
    }

    function getColorForPart(stats: UserGunStats | UserWeaponStats | null, part: string): string {
    const hitRates = getHitRates(stats);
    if (hitRates[part] === null) {
        return "#bebebe"; // Default grey color for null values
    }
    const hitRate = hitRates[part];

    // Generate gradient color based on hit rate
    const redColor = 75 + Math.floor(180 * hitRate); // Start from a slightly darker shade
    const colorHex = redColor.toString(16).padStart(2, "0"); // Convert to hex format

    return `#${colorHex}0000`; // Darker color to darkish red gradient
}


    let shotHitRates = getHitRates($stats);
    $: shotHitRates = getHitRates($stats);
</script>

<svg height="300" width="200" xmlns="http://www.w3.org/2000/svg">
    <style>
        .part-text {
            text-anchor: middle;
            dominant-baseline: central;
            fill: white;
            font-size: 14px;
            font-weight: bold;
        }
    </style>

    <!-- Head -->
    <circle class="head" cx="100" cy="50" r="30" fill={getColorForPart($stats, "head")} />
    {#if shotHitRates.head !== null}
        <text class="head-text part-text" x="100" y="50">{Math.floor(shotHitRates.head * 100).toString().padStart(3, " ")}%</text>
    {/if}

    <!-- Body -->
    <rect class="body" width="80" height="100" fill={getColorForPart($stats, "body")} x="60" y="90" />
    {#if shotHitRates.body !== null}
        <text class="body-text part-text" x="100" y="140">{Math.floor(shotHitRates.body * 100).toString().padStart(3, " ")}%</text>
    {/if}

    <!-- Left Arm -->
    <rect class="arm left-arm" width="30" height="100" fill={getColorForPart($stats, "arm")} x="15" y="90" />
    {#if shotHitRates.arm !== null}
        <text class="left-arm-text part-text" x="30" y="140">{Math.floor(shotHitRates.arm * 100).toString().padStart(3, " ")}%</text>
    {/if}

    <!-- Right Arm -->
    <rect class="arm right-arm" width="30" height="100" fill={getColorForPart($stats, "arm")} x="155" y="90" />
    {#if shotHitRates.arm !== null}
        <text class="right-arm-text part-text" x="170" y="140">{Math.floor(shotHitRates.arm * 100).toString().padStart(3, " ")}%</text>
    {/if}

    <!-- Left Leg -->
    <rect class="leg left-leg" width="30" height="100" fill={getColorForPart($stats, "leg")} x="60" y="200" />
    {#if shotHitRates.leg !== null}
        <text class="left-leg-text part-text" x="75" y="250">{Math.floor(shotHitRates.leg * 100).toString().padStart(3, " ")}%</text>
    {/if}

    <!-- Right Leg -->
    <rect class="leg right-leg" width="30" height="100" fill={getColorForPart($stats, "leg")} x="110" y="200" />
    {#if shotHitRates.leg !== null}
        <text class="right-leg-text part-text" x="125" y="250">{Math.floor(shotHitRates.leg * 100).toString().padStart(3, " ")}%</text>
    {/if}
</svg>
