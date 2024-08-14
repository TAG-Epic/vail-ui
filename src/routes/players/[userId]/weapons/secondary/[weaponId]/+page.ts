import { APIClient } from "$lib/api";
import { error } from '@sveltejs/kit';

export async function load(request) {
    const userId = request.params.userId;
    const weaponId = request.params.weaponId;

    const apiClient = new APIClient(request.fetch);

    const getUserStatsPromise = apiClient.getUserStats(userId);
    
    try {
        const userStats = await getUserStatsPromise;
        let weaponStats = userStats.weapons.secondary[weaponId];
        if (weaponStats === undefined) {
            error(404, {message: "Weapon not found"});
        }

        return {
            weaponStats,
            weaponId
        };
    } catch (errorDetails) {
        if (errorDetails.code === "field_validation_error" && errorDetails.details.field === "path.user_id" && errorDetails.details.error.code === "entity_not_found") {
            error(404, {message: "User not found"});
        } else {
            console.error({message: `failed to get user info for ${userId}}`, error: errorDetails});
            error(500, {message: "Failed to fetch user info"});
        }
    }

}
