import { persisted } from "svelte-persisted-store";

export const API_BASE = persisted("api.base", "https://vail-api.farfrom.world");
// export const API_BASE = persisted("api.base", "http://localhost:8000");
