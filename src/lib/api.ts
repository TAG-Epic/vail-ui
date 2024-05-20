const BASE_URI = "https://vail-scraper.farfrom.world/api/v2";

export type APIError = {
    code: string;
    detail: string;
};

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
        hits: {
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

type FetchMethod = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export class APIClient {
    #fetch: FetchMethod;
    constructor(fetch: FetchMethod | null) {
        if (fetch !== null) {
            this.#fetch = fetch;
        } else {
            this.#fetch = window.fetch;
        }
    }
    async searchForUserByName(query: string): Promise<UserInfo[]> {
        const response = await this.#fetch(`${BASE_URI}/users/search?name=${encodeURIComponent(query)}`);
        if (response.status !== 200) {
            const data = await response.json();
            throw data;
        }

        return (await response.json()).items;
    }
    async getUserInfo(userId: string): Promise<UserInfo> {
        const response = await this.#fetch(`${BASE_URI}/users/${encodeURIComponent(userId)}`);
        if (response.status !== 200) {
            const data = await response.json();
            throw data;
        }

        return await response.json();
    }
    async getUserStats(userId: string): Promise<UserStats> {
        const response = await this.#fetch(`${BASE_URI}/users/${encodeURIComponent(userId)}/stats`);
        if (response.status !== 200) {
            const data = await response.json();
            throw data;
        }

        return await response.json();

    }

    async getUserCount(): Promise<number> {
        const response = await this.#fetch(`${BASE_URI}/game/user-count`);
        if (response.status !== 200) {
            const data = await response.json();
            throw data;
        }

        return (await response.json()).count;
        
    }
}

