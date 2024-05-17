import type { PageLoad } from "./$types.d.ts";
import { APIClient } from "$lib/api";
import type { APIError } from "$lib/api";
import { error } from '@sveltejs/kit';

export async function load(request: PageLoad) {
    const userId = request.params.userId;

    const apiClient = new APIClient(request.fetch);

    const getUserInfoPromise = apiClient.getUserInfo(userId);
    const getUserStatsPromise = apiClient.getUserStats(userId).catch(() => {});
    
    try {
        const userInfo = await getUserInfoPromise;

        return {
            userInfo,
            userStats: getUserStatsPromise
        };
    } catch (errorDetails) {
        if (errorDetails.code !== undefined || errorDetails.detail !== undefined) {
            if (errorDetails.code === "user_not_found") {
                error(404, {
                    "message": "User not found"
                });
            }
        } else {
            console.error(`failed to get user info for ${userId}: ${errorDetails}`);
            error(500, {message: "Failed to fetch user info"});
        }
    }

}
