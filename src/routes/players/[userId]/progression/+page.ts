import { APIClient } from "$lib/api";
import { error } from '@sveltejs/kit';

export async function load(request) {
    const userId = request.params.userId;

    const apiClient = new APIClient(request.fetch);

    try {
        const userStats = await apiClient.getUserStats(userId);

        return {
            userStats
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
