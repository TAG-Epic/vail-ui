import ShotVisualizer from "$lib/elements/ShotVisualizer.svelte";
import type { PageLoad } from "./$types.d.ts";
import { APIClient } from "$lib/api";
import { createCombinationVirtualGun } from "$lib/virtual_gun";
import { error } from '@sveltejs/kit';
import { Resvg }  from "@resvg/resvg-js";

export async function GET(request: PageLoad) {
    const userId = request.params.userId;
    const apiClient = new APIClient(request.fetch);

    try {
        // Fetch user stats from the API
        const userStats = await apiClient.getUserStats(userId);
        
        // Filter out guns without shot data and create a combination virtual gun
        const guns = Object.values(userStats.weapons).filter(weapon => weapon.shots !== undefined);
        const gun = createCombinationVirtualGun(guns);
        const gunStore = writable(gun);
        
        // Render ShotVisualizer Svelte component with SVG output
        const { html } = ShotVisualizer.render({ svg: true, stats: gunStore });
        
        // Convert SVG to PNG using Resvg
        const resvg = new Resvg(html, {});
        const pngData = resvg.render().asPng();
        
        // Return PNG response
        return new Response(pngData, {
            headers: {
                "Content-Type": "image/png"
            }
        });
    } catch (errorDetails) {
        // Handle errors
        if (errorDetails.code === "user_not_found") {
            return error(404, {
                "message": "User not found"
            });
        }
        throw errorDetails;
    }
}
