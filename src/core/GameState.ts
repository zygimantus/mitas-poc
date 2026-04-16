import {StorageService} from "./StorageService.ts";
import {NPCManager} from "./NPCManager.ts";
import {HistoryManager} from "./HistoryManager.ts";
import {InventoryManager} from "./InventoryManager.ts";

export class GameState {
    constructor(
        public history: HistoryManager,
        public npcs: NPCManager,
        public inventory: InventoryManager
    ) {}

    public resetGame() {
        StorageService.clearAll();
        location.reload();
    }
}