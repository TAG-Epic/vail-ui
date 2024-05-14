import type { PageLoad } from "./$types.d.ts";
import { getUserInfo, getUserStats } from "$lib/api";

export async function load(request: PageLoad) {
    const userId = request.params.userId;

    return {
        userInfo: getUserInfo(userId),
        userStats: getUserStats(userId)
    };
}
