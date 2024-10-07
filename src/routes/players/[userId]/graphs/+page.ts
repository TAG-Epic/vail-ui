import { getUserStatHistory } from "$lib/api";
export async function load(request) {
    const userId = request.params.userId;


    return {
		userId,
		userStatHistory: await getUserStatHistory(userId, {})
	};
}
