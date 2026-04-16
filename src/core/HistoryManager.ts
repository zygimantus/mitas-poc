import {StorageKey, StorageService} from "./StorageService.ts";

export class HistoryManager {
    private history: string[];

    constructor() {
        this.history = StorageService.load(StorageKey.WORLD_HISTORY, []);
        this.updateUI();
    }

    public add(omega: string): void {
        if (this.history.includes(omega)) return;

        this.history.push(omega);
        this.saveToStorage();
        this.updateUI();
    }

    public getHistory(): string[] {
        return this.history;
    }

    public clear(): void {
        localStorage.removeItem('worldHistory');
        location.reload();
    }

    private loadFromStorage(): string[] {
        const stored = localStorage.getItem('worldHistory');
        return stored ? JSON.parse(stored) : [];
    }

    private saveToStorage(): void {
        StorageService.save(StorageKey.WORLD_HISTORY, this.history);
    }

    private updateUI(): void {
        const list = document.getElementById('history-list');
        if (!list) return;

        if (this.history.length === 0) {
            list.innerHTML = `<p style="color: gray; font-style: italic; font-size: 0.9em;">Istorija tuščia...</p>`;
            return;
        }

        list.innerHTML = this.history
            .map(omega => `
                <div class="omega-item">
                    <b>Ω</b> ${omega.replace(/_/g, ' ')}
                </div>
            `)
            .reverse()
            .join('');
    }
}