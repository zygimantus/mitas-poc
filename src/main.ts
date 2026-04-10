import {myths} from './types';
import {updateInventoryUI, tryFindItem} from './inventory';
import {renderMyth} from './renderer';

let currentStateId = 'Zmogus';
const worldHistory: string[] = JSON.parse(localStorage.getItem('worldHistory') || '[]');

const updateHistoryUI = () => {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;

    if (worldHistory.length === 0) {
        historyList.innerHTML = `<p style="color: gray; font-style: italic; font-size: 0.9em;">Istorija tuščia...</p>`;
        return;
    }

    historyList.innerHTML = worldHistory
        .map(omega => `<div class="omega-item"><b>Ω</b> ${omega.replace(/_/g, ' ')}</div>`)
        .reverse()
        .join('');
};

const saveHistory = () => {
    localStorage.setItem('worldHistory', JSON.stringify(worldHistory));
};

(window as any).ieskotiDaikto = (buttonEl: HTMLButtonElement) => {
    const result = tryFindItem();

    if (result.success) {
        updateInventoryUI({msg: `SĖKMĖ: Radote ${result.item?.label}!`, type: 'success'});
    } else {
        updateInventoryUI({msg: "TUŠČIA: Nieko nerasta.", type: 'fail'});
    }
    renderMyth(currentStateId, worldHistory);
};

(window as any).performAction = (actionId: string, nextStateId: string) => {
    const currentState = myths.states[currentStateId];
    const action = currentState?.actions?.find(a => a.id === actionId);

    if (action?.omega && !worldHistory.includes(action.omega)) {
        worldHistory.push(action.omega);
        saveHistory();
        updateHistoryUI();
    }

    currentStateId = nextStateId;

    const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;
    if (searchBtn) {
        searchBtn.disabled = false;
        searchBtn.innerText = "🔍 Ieškoti daikto";
    }

    updateInventoryUI({ msg: "Pasiruošęs paieškai", type: 'reset' });
    renderMyth(currentStateId, worldHistory);
};

(window as any).isvalytiAtminti = () => {
    if (confirm("Ar tikrai norite ištrinti visą pasaulio atmintį?")) {
        localStorage.removeItem('worldHistory');
        location.reload();
    }
};

updateHistoryUI();
updateInventoryUI();
renderMyth(currentStateId, worldHistory);