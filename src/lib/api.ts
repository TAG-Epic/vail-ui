const BASE_URI = "https://vail-scraper.farfrom.world/api/v2";

class APIError {
    constructor(data) {
        this.code = data.code;
        this.detail = data.detail;
    }
}

export type UserInfo = {
    id: string;
    name: string;
}

export type UserMapStats = {
    match_results: {
        wins: number;
        losses: number;
        draws: number;
        abandons: number;
    }
};
export type UserWeaponStats = {
    kills: {
        total: number;
        headshot_kills: number;
    };
};
export type UserGunStats = {
    kills: {
        total: number;
        headshot_kills: number;
    };
    shots: {
        fired: number;
        hit: {
            leg: number;
            arm: number;
            body: number;
            head: number;
        };
    };
};
export type UserStats = {
    maps: Record<string, UserMapStats>;
    weapons: Record<string, UserWeaponStats | UserGunStats>
};

export async function searchForUsername(query: string): Promise<UserInfo[]> {
    const response = await fetch(`${BASE_URI}/users/search?name=${encodeURIComponent(query)}`);
    if (response.status !== 200) {
        const data = await response.json();
        throw new APIError(data);
    }

    return (await response.json()).items;

}
export async function getUserInfo(userId: string): Promise<UserInfo> {
    const response = await fetch(`${BASE_URI}/users/${encodeURIComponent(userId)}`);
    if (response.status !== 200) {
        const data = await response.json();
        throw new APIError(data);
    }

    return await response.json();
}
export async function getUserStats(userId: string): Promise<UserStats> {
    const response = await fetch(`${BASE_URI}/users/${encodeURIComponent(userId)}/stats`);
    if (response.status !== 200) {
        const data = await response.json();
        throw new APIError(data);
    }

    return await response.json();

}
