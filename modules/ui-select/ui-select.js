// Minimal UI Select module
// Provides a custom dropdown selector with floating card positioning.

export function selectLang(e) {
    if (isRecording) return;

    let wrapper = e.target.closest('.dv-select');

    // If click came from floating card, map it back to its original wrapper
    if (!wrapper) {
        const card = e.target.closest('.dv-card');
        if (card && card.dataset.id) {
            const flag = document.getElementById(card.dataset.id);
            if (flag) wrapper = flag.closest('.dv-select');
        }
    }

    // Close all other open selectors
    const all = document.querySelectorAll('.dv-select');
    all.forEach(w => {
        if (w !== wrapper) {
            const b = w.querySelector('.dv-flag');
            closeCard(w, b.id);
        }
    });

    if (!wrapper) return;

    const button = wrapper.querySelector('.dv-flag');
    const idButton = button.id;

    let card = document.querySelector(`.dv-card[data-id="${idButton}"]`);
    if (!card) {
        card = wrapper.querySelector('.dv-card');
    }

    // If clicking the button — toggle card
    if (button.contains(e.target)) {
        if (card.classList.contains('dn')) {
            openCard(wrapper, card, idButton);
        } else {
            closeCard(wrapper, idButton);
        }
        return;
    }

    // If clicking an item inside the card
    const item = e.target.closest('.dv-card button');
    if (!item) return;

    // Clear previous selection
    card.querySelectorAll('.dv-card button').forEach(b => {
        b.classList.remove('selected');
        const icon = b.querySelector('svg');
        if (icon) icon.remove();
    });

    item.classList.add('selected');

    const { code, name, color } = getParam(item);

    update(button, code, name, color);

    closeCard(wrapper, idButton);

    wrapper.dispatchEvent(new CustomEvent('change', {
        detail: { code, name, color }
    }));
}

export function getParam(el) {
    return {
        code: el.querySelector('.dv-flag-emblem').textContent,
        name: el.querySelector('.dv-name').textContent,
        color: el.querySelector('.dv-flag-emblem').style.background
    };
}

export function update(el, codeEl, nameEl, colorEl) {
    el.querySelector(".dv-flag-emblem").textContent = codeEl;
    el.querySelector(".dv-name").textContent = nameEl;
    el.querySelector(".dv-flag-emblem").style.background = colorEl;
    el.dataset.code = codeEl.toLowerCase();
    return el;
}

function openCard(wrapper, card, id) {
    card.classList.remove('dn');
    document.body.appendChild(card);

    const rect = wrapper.getBoundingClientRect();
    card.style.position = 'absolute';
    card.style.top = rect.bottom + 6 + 'px';
    card.style.left = rect.left + 'px';
    card.style.zIndex = 999999;
    card.dataset.id = id;
}

function closeCard(wrapper, id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (!card) return;

    card.classList.add('dn');
    wrapper.appendChild(card);

    card.style.position = '';
    card.style.top = '';
    card.style.left = '';
    card.style.zIndex = '';
    card.removeAttribute('data-id');
}
