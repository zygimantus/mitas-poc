import { HistoryManager } from './core/HistoryManager';
import { NPCManager } from './core/NPCManager';
import { InventoryManager } from './core/InventoryManager';
import { GameState } from './core/GameState';
import { ActionEngine } from './logic/ActionEngine';

const history = new HistoryManager();
const npcs = new NPCManager();
const inventory = new InventoryManager();

const state = new GameState(history, npcs, inventory);

const engine = new ActionEngine(state);

(window as any).performAction = (a: string, n: string) => engine.perform(a, n);
(window as any).ieskotiDaikto = (el: HTMLButtonElement) => engine.search(el);
(window as any).isvalytiAtminti = () => state.resetGame();

engine.refresh();