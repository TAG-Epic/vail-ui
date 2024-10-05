export type UserInfo = {
    id: string;
    display_name: string;
    avatar_url: string;
};
export type NoPagingPager<ItemT> = {
    items: ItemT[]
};
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
    kanto: UserKantoStats;
    total: {
        kills: {
            throwing: {
                total: number;
                longest_throw: number;
            }
        }
    };
};
export type UserKantoStats = {
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
    melee: UserMeleeStats;
    utility: Record<string, UserUtilityStats>;
};
export type UserStats = {
    maps: Record<string, UserMapStats>;
    weapons: UserWeaponStats;
    // TODO: Gamemodes
    // TODO: Progression
    // TODO: Total
};
export type UsernameHistoryEntry = {
	display_name: string;
	discovered_at: string;
};
export type AvatarHistoryEntry = {
	avatar_url: string;
	discovered_at: string;
};
