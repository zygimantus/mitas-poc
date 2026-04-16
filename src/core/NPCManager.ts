import { StorageService, StorageKey } from './StorageService';
import {actors, ActorsDB} from '../actors';

export class NPCManager {
    private actors: ActorsDB;

    constructor() {
        this.actors = StorageService.load<ActorsDB>(StorageKey.NPC_LOYALTY, actors);
        this.updateUI();
    }

    public changeLoyalty(npcId: string, amount: number): void {
        const targetNPC = this.actors[npcId];

        if (targetNPC) {
            targetNPC.loyalty = Math.max(0, Math.min(100, targetNPC.loyalty + amount));

            StorageService.save(StorageKey.NPC_LOYALTY, this.actors);

            this.updateUI();
        } else {
            console.warn(`NPC su ID "${npcId}" nerastas!`);
        }
    }

    public updateUI(): void {
        const npcList = document.getElementById('npc-list');
        if (!npcList) return;

        npcList.innerHTML = Object.entries(this.actors)
            .map(([id, data]) => this.generateNPCHtml(id, data))
            .join('');
    }

    private generateNPCHtml(id: string, data: any): string {
        const colorClass = this.getBarColorClass(data.loyalty);

        return `
            <div class="npc-container" data-npc-id="${id}">
                <div class="npc-name">
                    <span>${data.name}</span>
                    <span style="font-size: 0.8em; opacity: 0.7;">${data.loyalty}%</span>
                </div>
                <div class="status-track">
                    <div class="status-bar ${colorClass}" style="width: ${data.loyalty}%"></div>
                </div>
            </div>`;
    }

    private getBarColorClass(loyalty: number): string {
        if (loyalty < 40) return 'bar-angry';
        if (loyalty < 70) return 'bar-neutral';
        return 'bar-happy';
    }
}