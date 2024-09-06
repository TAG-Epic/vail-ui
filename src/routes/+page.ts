import { getUserCount } from "$lib/api";

export async function load(request) {
    const userId = request.params.userId;
    
    return {
        userCount: await getUserCount()
    };

}
