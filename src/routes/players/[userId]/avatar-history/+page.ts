import { getUserAvatarHistory } from "$lib/api";
export async function load(request) {
    const userId = request.params.userId;

	let avatarHistoryPromise = getUserAvatarHistory(userId);

    return {userId, avatarHistory: avatarHistoryPromise};
}
