import { error } from '@sveltejs/kit';
import { getUserStats } from "$lib/api";
import { APIError } from "$lib/api/errors";

export async function load(request) {
    const userId = request.params.userId;

    const getUserStatsPromise = getUserStats(userId);
    
    try {
        const userStats = await getUserStatsPromise;
        let meleeStats = userStats.weapons.melee;
        return {
            meleeStats,
        };
    } catch (fetchError) {
        if (fetchError instanceof APIError) {
            if (fetchError.data.code === "field_validation_error" && fetchError.data.details.field === "path.user_id" && fetchError.data.details.error.code === "entity_not_found") {
                error(404, {message: "User not found"});
            }
        }
        console.error({message: `failed to get user info for ${userId}`, error: fetchError});
        error(500, {message: "Failed to fetch user info"});
    }

}
