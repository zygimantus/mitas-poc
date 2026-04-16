import { GameState } from '../core/GameState';
import { myths, MythAction } from '../types';
import { renderMyth } from '../renderer';
import {StorageKey, StorageService} from "../core/StorageService.ts";

export class ActionEngine {
    private currentStateId = 'Zmogus';

    constructor(private state: GameState) {}

    public perform(actionId: string, nextStateId: string): void {
        const action = this.findAction(actionId);
        if (!action) return;

        if (action.omega) this.state.history.add(action.omega);
        if (action.impact) this.state.npcs.changeLoyalty(action.impact.npc, action.impact.value);

        const nextState = myths.states[nextStateId];

        if (action.completes_myth && nextState?.terminal) {
            this.markMythAsCompleted(action);
        }

        this.currentStateId = nextStateId;
        this.refresh();
    }

    public search(buttonEl: HTMLButtonElement): void {
        const result = this.state.inventory.tryFindItem();
        this.state.inventory.updateUI({ msg: result.msg, type: result.type });

        // buttonEl.disabled = true;
        // buttonEl.innerText = "Ieškota";
        this.refresh();
    }

    public refresh(): void {
        renderMyth(
            this.currentStateId,
            this.state.history.getHistory(),
            this.state.inventory
        );
    }

    private findAction(actionId: string): MythAction | undefined {
        return myths.states[this.currentStateId]?.actions?.find(a => a.id === actionId);
    }

    private markMythAsCompleted(action: MythAction): void {
        const completed = StorageService.load<string[]>(StorageKey.COMPLETED_MYTHS, []);

        if (action.completes_myth && !completed.includes(action.completes_myth)) {
            completed.push(action.completes_myth);
            StorageService.save(StorageKey.COMPLETED_MYTHS, completed);

            console.log("SĖKMĖ: Mitas įrašytas į Storage:", action.completes_myth);
            console.log("Dabartinis sąrašas:", completed);
        }
    }
}