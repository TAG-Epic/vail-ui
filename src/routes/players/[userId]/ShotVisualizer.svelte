<script lang="ts">
    import type { UserGunStats, UserWeaponStats } from "$lib/api";
    export let stats: writable<UserGunStats | UserWeaponStats | null>;

    function getColorForPart(stats: UserGunStats | UserWeaponStats | null, part: string): string {
        if (stats === null || stats.shots === undefined) {
            return "#bebebe";
        }
        const hits = stats.shots.hits;

        const totalHits = Object.values(hits).reduce((accumulator, value) => {return accumulator + value}, 0);
        const hitRate = parseFloat(hits[part]) / parseFloat(totalHits);
        
        const redHitColor = 0xFF * hitRate;
        const redHitColorHex = Math.floor(redHitColor).toString(16);
        console.log(redHitColorHex);

        return `#${redHitColorHex}0000`
    }
</script>

<svg height="300" width="300">
    <circle class="head" cx="100" cy="50" r="30" fill={getColorForPart($stats, "head")} />
    <rect class="body" width="80" height="100" fill={getColorForPart($stats, "body")} x="60" y="90" />
    <rect class="arm left-arm" width="30" height="100" fill={getColorForPart($stats, "arm")} x="15" y="90" />
    <rect class="arm right-arm" width="30" height="100" fill={getColorForPart($stats, "arm")} x="155" y="90" />
    <rect class="leg left-leg" width="30" height="100" fill={getColorForPart($stats, "leg")} x="60" y="200" />
    <rect class="leg right-leg" width="30" height="100" fill={getColorForPart($stats, "leg")} x="110" y="200" />
</svg>
