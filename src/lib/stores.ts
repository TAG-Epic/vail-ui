import { writable } from "svelte/store";

export const SEEN_NOTICE = writable<boolean>(false);
