import mythsData from './myths.json';
import itemsData from './items.json';

export interface MythAction {
    id: string;
    next_state: string;
    label: string;
    tool?: string;
    omega?: string;
}

export interface MythState {
    label: string;
    actions?: MythAction[];
    terminal?: boolean;
}

export const myths = mythsData as { states: Record<string, MythState> };
export const ITEMS_DB = itemsData as Record<string, { icon: string, label: string }>;