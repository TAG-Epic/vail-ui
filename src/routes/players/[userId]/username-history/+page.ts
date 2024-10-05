import { getUserUsernameHistory } from "$lib/api";
export async function load(request) {
    const userId = request.params.userId;

	let usernameHistoryPromise = getUserUsernameHistory(userId);

    return {userId, usernameHistory: usernameHistoryPromise};
}
