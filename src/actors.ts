export interface NPC {
    name: string;
    loyalty: number;
}

export type ActorsDB = Record<string, NPC>;

export interface Action {
    id: string;
    next_state: string;
    label: string;
    tool?: string;
    omega?: string;
    probability?: number;
    impact?: { npc: string; value: number };
}

export const actors: ActorsDB = {
    "HIERONAS": {
        name: "Karalius Hieronas II",
        loyalty: 50
    },
    "LIZDEIKA": {
        name: "Žynys Lizdeika",
        loyalty: 50
    },
    "ZEUSAS": {
        name: "Dzeusas",
        loyalty: 10
    }
};