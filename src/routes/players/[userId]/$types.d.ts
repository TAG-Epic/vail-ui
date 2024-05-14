import type * as Kit from '@sveltejs/kit';
type RouteParams = {
    userId: string
}
export type PageServerLoad = Kit.ServerLoad<RouteParams>;
export type PageLoad = Kit.Load<RouteParams>;
