// Minimal scroll-sync module
// Provides synchronized scrolling and auto-scroll-to-bottom behavior.

let autoLeft = true;
let autoRight = true;
let userScrolledUpMobile = false;

/**
 * Initialize scroll tracking for two containers.
 * lBox — left container
 * rBox — right container
 */
export function initScroll(lBox, rBox, options = {}) {
    const { mobile = false, mobileBox = null } = options;

    if (mobile && mobileBox) {
        mobileBox.addEventListener("scroll", () => {
            const atBottom =
                mobileBox.scrollTop + mobileBox.clientHeight >= mobileBox.scrollHeight - 1;

            userScrolledUpMobile = !atBottom;
        });

        return;
    }

    let syncing = false;

    function track(box, setAutoFlag) {
        box.addEventListener("scroll", () => {
            const atBottom =
                box.scrollTop + box.clientHeight >= box.scrollHeight - 5;

            setAutoFlag(atBottom);

            if (syncing) return;
            syncing = true;

            if (box === lBox) {
                rBox.scrollTop = lBox.scrollTop;
            } else {
                lBox.scrollTop = rBox.scrollTop;
            }

            syncing = false;
        });
    }

    track(lBox, val => autoLeft = val);
    track(rBox, val => autoRight = val);
}

/**
 * Auto-scroll both containers to bottom if allowed.
 * Call this when new content arrives.
 */
export function autoScroll(lBox, rBox) {
    if (autoLeft) {
        lBox.scrollTop = lBox.scrollHeight;
    }
    if (autoRight) {
        rBox.scrollTop = rBox.scrollHeight;
    }
}
