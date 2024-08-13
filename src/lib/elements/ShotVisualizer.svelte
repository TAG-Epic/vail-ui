<script lang="ts">
    import type { UserGunStats } from "$lib/api";
    export let stats: UserGunStats;

    type HitRates = {
        head: number | null;
        body: number | null;
        arm: number | null;
        leg: number | null;
    };

    function getHitRates(stats: UserGunStats): HitRates {
        const hits = stats.shots.hits;
        const totalHits = Object.values(hits).reduce((accumulator, value) => {return accumulator + value}, 0);

        return {
            head: hits.head / totalHits,
            body: hits.body / totalHits,
            arm: hits.arm / totalHits,
            leg: hits.leg / totalHits,
        };
    }

    function getColorForPart(stats: UserGunStats, part: string): string {
        const hitRates = getHitRates(stats);
        const hitRate = hitRates[part];

        const redHitColor = 0xFF * hitRate;
        const redHitColorHex = Math.floor(redHitColor).toString(16).padStart(2, "0");

        return `#${redHitColorHex}0000`
    }
    let shotHitRates = getHitRates(stats);
</script>

<svg height="300" width="200" xmlns="http://www.w3.org/2000/svg">
    <style>
        .part-text {
            fill: white;
            text-align: center;
            width: 4ch;
            white-space: pre;
        }
        .left-arm-text {
            display: block;
        }
    </style>
    <circle class="head" cx="100" cy="50" r="30" fill={getColorForPart(stats, "head")} />
    {#if shotHitRates.head !== null}
        <text class="head-text part-text" x="75" y="55" width="4ch">{Math.floor(shotHitRates.head * 100).toString().padStart(3, " ")}%</text>
    {/if}
    <rect class="body" width="80" height="100" fill={getColorForPart(stats, "body")} x="60" y="90" />
    {#if shotHitRates.body !== null}
        <text class="body-text part-text" x="75" y="145">{Math.floor(shotHitRates.body * 100).toString().padStart(3, " ")}%</text>
    {/if}
    <rect class="arm left-arm" width="30" height="100" fill={getColorForPart(stats, "arm")} x="15" y="90" />
    {#if shotHitRates.arm !== null}
        <text class="left-arm-text arm-text part-text" x="25" y="140" text-anchor="middle" dominant-baseline="central" transform="rotate(90 30 140)">{Math.floor(shotHitRates.arm * 100).toString().padStart(3, " ")}%</text>
    {/if}
    <rect class="arm right-arm" width="30" height="100" fill={getColorForPart(stats, "arm")} x="155" y="90" />
    {#if shotHitRates.arm !== null}
        <text class="right-arm-text arm-text part-text" x="25" y="0" text-anchor="middle" dominant-baseline="central" transform="rotate(90 30 140)">{Math.floor(shotHitRates.arm * 100).toString().padStart(3, " ")}%</text>
    {/if}
    <rect class="leg left-leg" width="30" height="100" fill={getColorForPart(stats, "leg")} x="60" y="200" />
    {#if shotHitRates.leg !== null}
        <text class="left-leg-text leg-text part-text" x="140" y="95" text-anchor="middle" dominant-baseline="central" transform="rotate(90 30 140)">{Math.floor(shotHitRates.leg * 100).toString().padStart(3, " ")}%</text>
    {/if}
    <rect class="leg right-leg" width="30" height="100" fill={getColorForPart(stats, "leg")} x="110" y="200" />
    {#if shotHitRates.leg !== null}
        <text class="right-leg-text leg-text part-text" x="140" y="45" text-anchor="middle" dominant-baseline="central" transform="rotate(90 30 140)">{Math.floor(shotHitRates.leg * 100).toString().padStart(3, " ")}%</text>
    {/if}
</svg>
