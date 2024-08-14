let BASE_URI = "https://vail-scraper.farfrom.world/api/v3";
// BASE_URI = "http://localhost:8000/api/v3";

export type APIError = {
    code: string;
    detail: string;
};

export type UserInfo = {
    id: string;
    display_name: string;
}

export type UserMapStats = {
    match_results: {
        wins: number;
        losses: number;
        draws: number;
        abandons: number;
    }
};
export type UserGunStats = {
    kills: {
        total: number;
        headshots: number;
    };
    shots: {
        total: number;
        hits: {
            leg: number;
            arm: number;
            body: number;
            head: number;
        };
    };
};
export type UserMeleeStats = {
    kills: {
        total: number;
        headshot_kills: number;
    };
};
export type UserUtilityStats = {
    kills: {
        total: number;
    };
};
export type UserWeaponStats = {
    primary: Record<string, UserGunStats>,
    secondary: Record<string, UserGunStats>,
    melee: Record<string, UserMeleeStats>;
    utility: Record<string, UserUtilityStats>;
};
export type UserStats = {
    maps: Record<string, UserMapStats>;
    weapons: UserWeaponStats
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
        const response = await this.#fetch(`${BASE_URI}/users/search?name=${encodeURIComponent(query)}`, {
            method: "POST"
        });
        if (response.status !== 200) {
            const data = await response.json();
            throw data;
        }

        return (await response.json()).items;
    }
    async getUserInfo(userId: string): Promise<UserInfo> {
        const response = await this.#fetch(`${BASE_URI}/users/${encodeURIComponent(userId)}/info`);
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

