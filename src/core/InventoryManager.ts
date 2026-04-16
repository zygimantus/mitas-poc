import { StorageService, StorageKey } from './StorageService';
import { ITEMS_DB } from '../types';

export interface SearchResult {
    success: boolean;
    item?: { label: string; icon: string };
    msg: string;
    type: 'success' | 'fail' | 'reset';
}

export class InventoryManager {
    private items: Set<string>;

    constructor() {
        const savedItems = StorageService.load<string[]>(StorageKey.INVENTORY, []);
        this.items = new Set(savedItems);
        this.updateUI();
    }

    public has(itemId: string): boolean {
        return this.items.has(itemId);
    }

    public tryFindItem(): SearchResult {
        const availableItems = Object.keys(ITEMS_DB).filter(id => !this.items.has(id));

        if (availableItems.length > 0 && Math.random() < 0.1) {
            const randomId = availableItems[Math.floor(Math.random() * availableItems.length)];
            this.addItem(randomId);

            return {
                success: true,
                item: ITEMS_DB[randomId],
                msg: `SĖKMĖ: Radote ${ITEMS_DB[randomId].label}!`,
                type: 'success'
            };
        }

        return {
            success: false,
            msg: "TUŠČIA: Nieko nerasta.",
            type: 'fail'
        };
    }

    private addItem(itemId: string): void {
        this.items.add(itemId);
        this.save();
        this.updateUI();
    }

    private save(): void {
        StorageService.save(StorageKey.INVENTORY, Array.from(this.items));
    }

    public updateUI(feedback?: { msg: string, type: string }): void {
        const statusEl = document.getElementById('search-status');
        const slotEl = document.getElementById('inv-slot');

        if (statusEl && feedback) {
            statusEl.innerText = feedback.msg;
            statusEl.className = feedback.type;
        }

        if (slotEl) {
            if (this.items.size === 0) {
                slotEl.innerText = "Tuščia";
            } else {
                slotEl.innerHTML = Array.from(this.items)
                    .map(id => `<span>${ITEMS_DB[id].icon} ${ITEMS_DB[id].label}</span>`)
                    .join(' ');
            }
        }
    }
}