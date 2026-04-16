import { myths, MythState, MythAction } from './types';
import { InventoryManager } from './core/InventoryManager';
import { StorageService, StorageKey } from './core/StorageService';

export const renderMyth = (currentStateId: string, history: string[], inventory: InventoryManager) => {
    const app = document.getElementById('app')!;
    const state = myths.states[currentStateId];

    if (!state) {
        app.innerHTML = renderError(currentStateId);
        return;
    }

    const visibleActions = filterActions(state, inventory);

    app.innerHTML = `
        <div class="myth-content">
            ${renderHeader(state)}
            <div id="controls" style="display: flex; flex-wrap: wrap; gap: 15px;">
                ${renderActions(visibleActions)}
                ${renderEmptyStateHint(visibleActions, state)}
                ${renderTerminalState(state)}
            </div>
        </div>
    `;
};

const filterActions = (state: MythState, inventory: InventoryManager): MythAction[] => {
    const completedMyths = StorageService.load<string[]>(StorageKey.COMPLETED_MYTHS, []);

    return state.actions?.filter(a => {
        if (a.tool && !inventory.has(a.tool)) {
            return false;
        }

        return !(a.completes_myth && completedMyths.includes(a.completes_myth));

    }) || [];
};

const renderHeader = (state: MythState): string => {
    return `
        <header style="margin-bottom: 40px;">
            <small style="color: #aaa; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
                ${state.psi || 'Mito fragmentas'} 
                ${state.status ? `• <span style="color: #6366f1;">${state.status}</span>` : ''}
            </small>
            <h1 style="font-size: 2.8em; margin: 10px 0; color: #1a1a1a; line-height: 1.2;">
                ${state.label}
            </h1>
        </header>
    `;
};

const renderActions = (actions: MythAction[]): string => {
    return actions.map(a => `
        <button 
            class="action-btn" 
            onclick="window.performAction('${a.id}', '${a.next_state}')"
            style="position: relative;"
        >
            ${a.label}
            ${a.probability ? `
                <span style="display:block; font-size: 0.6em; opacity: 0.7;">
                    Sėkmė: ${a.probability * 100}%
                </span>` : ''}
        </button>
    `).join('');
};

const renderEmptyStateHint = (visibleActions: MythAction[], state: MythState): string => {
    if (visibleActions.length === 0 && !state.terminal) {
        return `
            <div class="hint" style="background: #fffbeb; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; width: 100%;">
                💡 <b>Veiksmui atlikti reikia papildomų priemonių.</b> <br>
                Jums reikia įrankio, kad tęstumėte. Pabandykite pasižvalgyti aplinkui.
            </div>
        `;
    }
    return '';
};

const renderTerminalState = (state: MythState): string => {
    if (!state.terminal) return '';
    return `
        <div style="margin-top: 40px; padding: 30px; background: #f0fdf4; border-radius: 12px; border: 1px solid #dcfce7; width: 100%; text-align: center;">
            <h2 style="margin: 0 0 10px 0;">✨ Istorija užfiksuota</h2>
            <p style="color: #166534; margin-bottom: 20px;">Pasaulio atmintis pasipildė.</p>
            <button onclick="location.reload()" style="background: #166534; color: white; padding: 12px 25px;">Atgal į pradžią</button>
        </div>
    `;
};

const renderError = (id: string): string => `
    <h1 style="color:red">Klaida: Būsena "${id}" nerasta!</h1>
`;