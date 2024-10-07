import type { UserInfo, NoPagingPager, UserStats, UsernameHistoryEntry, AvatarHistoryEntry, TimePagingFilter, TimeseriesUserStats } from "./types";
import { API_BASE } from "./stores";
import { APIError } from "./errors";
import { get } from "svelte/store";

function getApiBase() {
    return get(API_BASE);
}

async function errorForStatus(response: Response): Promise<void> {
    if (!response.ok) {
        console.log(response.url);
        let errorData = await response.json();
        throw new APIError(errorData);
    }
}

export async function searchForUserByName(query: string): Promise<UserInfo[]> {
    let response = await fetch(`${getApiBase()}/api/v3/users/search?name=${encodeURIComponent(query)}`, {
        method: "POST"
    });
    await errorForStatus(response);

    let data = (await response.json()) as NoPagingPager<UserInfo>;

    return data.items;
}
export async function getUserInfo(userId: string): Promise<UserInfo> {
    let response = await fetch(`${getApiBase()}/api/v3/users/${encodeURIComponent(userId)}/info`);
    await errorForStatus(response);

    return await response.json() as UserInfo;
}

export async function getUserStats(userId: string): Promise<UserStats> {
    let response = await fetch(`${getApiBase()}/api/v3/users/${encodeURIComponent(userId)}/stats`);
    await errorForStatus(response);

    return await response.json() as UserStats;

}
export async function getUserCount(): Promise<number> {
    let response = await fetch(`${getApiBase()}/api/v3/game/user-count`);
    await errorForStatus(response);

    return (await response.json()).count;
    
}
export async function getUserRankings(userId: string): Promise<UserStats> { // Oh god the type signature 
    let response = await fetch(`${getApiBase()}/api/v3/users/${encodeURIComponent(userId)}/stats/rankings`);
    await errorForStatus(response);

    return (await response.json()) as UserStats;
}
export async function getUserUsernameHistory(userId: string): Promise<UsernameHistoryEntry[]> {
	let response = await fetch(`${getApiBase()}/api/v3/users/${encodeURIComponent(userId)}/display-name/history`);
	await errorForStatus(response);
    return (await response.json()).items as UsernameHistoryEntry[];
}
export async function getUserAvatarHistory(userId: string): Promise<AvatarHistoryEntry[]> {
	let response = await fetch(`${getApiBase()}/api/v3/users/${encodeURIComponent(userId)}/avatar/history`);
	await errorForStatus(response);
    return (await response.json()).items as AvatarHistoryEntry[];
}
export async function getUserStatHistory(userId: string, paging: TimePagingFilter): Promise<TimeseriesUserStats[]> {
	let params = new URLSearchParams();
	if (paging.before !== undefined) {
		params.set("before", paging.before);
	}
	if (paging.after !== undefined) {
		params.set("after", paging.after);
	}
	let response = await fetch(`${getApiBase()}/api/v3/users/${encodeURIComponent(userId)}/stats/history?${params.toString()}`);
	await errorForStatus(response);
    return (await response.json()).items as TimeseriesUserStats[];
}
