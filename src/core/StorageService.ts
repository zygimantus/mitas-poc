export enum StorageKey {
    WORLD_HISTORY = 'world_history',
    NPC_LOYALTY = 'npc_loyalty',
    INVENTORY = 'player_inventory',
    LAST_STATE = 'current_state_id',
    COMPLETED_MYTHS = 'completed_myths'
}

export class StorageService {
    public static save<T>(key: StorageKey, data: T): void {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error(`Klaida saugant duomenis raktu ${key}:`, error);
        }
    }

    public static load<T>(key: StorageKey, defaultValue: T): T {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error(`Klaida kraunant duomenis raktu ${key}:`, error);
            return defaultValue;
        }
    }

    public static remove(key: StorageKey): void {
        localStorage.removeItem(key);
    }

    public static clearAll(): void {
        localStorage.clear();
    }
}