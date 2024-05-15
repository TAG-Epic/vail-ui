import ShotVisualizer from "$lib/elements/ShotVisualizer.svelte";
import type { PageLoad } from "./$types.d.ts";
import { APIClient } from "$lib/api";
import type { UserGunStats } from "$lib/api";
import { createCombinationVirtualGun } from "$lib/virtual_gun";
import { error } from '@sveltejs/kit';
import { writable } from "svelte/store";
import { Resvg }  from "@resvg/resvg-js";

export async function GET(request: PageLoad) {
    const userId = request.params.userId;

    const apiClient = new APIClient(request.fetch);

    let svg: string;
    
    try {
        const userStats = await apiClient.getUserStats(userId);
        const guns = Object.values(userStats.weapons).filter(weapon => weapon.shots !== undefined);
        const gun = createCombinationVirtualGun(guns);
        const gunStore = writable<UserGunStats>(gun);
        const renderResult = ShotVisualizer.render({svg: true, stats: gunStore});
        svg = renderResult.html;
    } catch (errorDetails) {
        if (errorDetails.code === undefined || errorDetails.detail === undefined) {
            throw errorDetails;
        }
        if (errorDetails.code === "user_not_found") {
            return error(404, {
                "message": "User not found"
            });
        }
        throw errorDetails;
    }

    const resvg = new Resvg(svg, {});
    const pngData = resvg.render().asPng();
    return new Response(pngData, {
        headers: {
            "Content-Type": "image/png"
        }
    });
    
}
