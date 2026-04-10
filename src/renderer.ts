import { myths } from './types';
import { inventory } from './inventory';

export const renderMyth = (currentStateId: string, _history: string[]) => {
    const state = myths.states[currentStateId];
    const app = document.getElementById('app')!;

    if (!state) {
        app.innerHTML = `<h1 style="color:red">Klaida: Būsena "${currentStateId}" nerasta!</h1>`;
        return;
    }

    const visibleActions = state.actions?.filter(a => {
        if (!a.tool) return true;
        return inventory.has(a.tool);
    }) || [];

    app.innerHTML = `
    <div class="myth-content">
        <small style="color: #aaa; text-transform: uppercase; letter-spacing: 1px;">Mito etapas</small>
        <h1 style="font-size: 2.5em; margin: 10px 0 20px 0; color: #222;">${state.label}</h1>
        
        <div id="controls">
          ${visibleActions.map(a => `
            <button class="action-btn" onclick="window.performAction('${a.id}', '${a.next_state}')">
                ${a.label}
            </button>
          `).join('')}

          ${visibleActions.length === 0 && !state.terminal ?
        `<p class="hint">Šiuo metu veiksmų nėra. Pabandykite ieškoti daiktų viršutinėje juostoje...</p>` : ''}

          ${state.terminal ? `
            <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 8px; border: 1px solid #dcfce7;">
                <p>🎉 <b>Mitas baigtas.</b> Pasaulis pasikeitė.</p>
                <button onclick="location.reload()" style="background: #222; color: white;">Pradėti iš naujo</button>
            </div>
          ` : ''}
        </div>
    </div>`;
};