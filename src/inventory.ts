import { ITEMS_DB } from './types';

export const inventory = new Set<string>();

export const updateInventoryUI = (status?: { msg: string, type: 'success' | 'fail' | 'reset' }) => {
    const statusEl = document.getElementById('search-status');
    const invSlot = document.getElementById('inv-slot');

    if (!statusEl || !invSlot) return;

    invSlot.innerHTML = Array.from(inventory)
        .map(key => {
            const item = ITEMS_DB[key];
            return item ? `${item.icon}: 1` : '';
        })
        .filter(html => html !== '')
        .join(' | ') || "Tuščia";

    if (status) {
        statusEl.innerText = status.msg;
        statusEl.className = status.type === 'success' ? 'found' : (status.type === 'fail' ? 'not-found' : '');
    }
};

export const tryFindItem = () => {
    const availableToFind = Object.keys(ITEMS_DB).filter(key => !inventory.has(key));

    if (availableToFind.length > 0 && Math.random() > 0.5) {
        const randomIndex = Math.floor(Math.random() * availableToFind.length);
        const foundKey = availableToFind[randomIndex];

        inventory.add(foundKey);
        return { success: true, item: ITEMS_DB[foundKey] };
    }
    return { success: false };
};