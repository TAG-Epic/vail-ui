import { APIClient } from "$lib/api";
import type { APIError } from "$lib/api";
import { error } from '@sveltejs/kit';

export async function load(request) {
    const userId = request.params.userId;

    const apiClient = new APIClient(request.fetch);
    
    return {
        userCount: apiClient.getUserCount()
    };

}
