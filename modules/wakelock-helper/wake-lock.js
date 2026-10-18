// Minimal WakeLock Helper
// Keeps the screen awake on supported mobile browsers during active usage.

let wakeLock = null;

/**
 * Request a screen wake lock.
 * Prevents the device from dimming or locking the screen.
 */
export async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
        console.log(`${err.name}: ${err.message}`);
    }
}

/**
 * Release the wake lock if active.
 */
export async function releaseWakeLock() {
    if (wakeLock !== null) {
        try {
            await wakeLock.release();
        } catch (err) {
            console.log(`${err.name}: ${err.message}`);
        }
        wakeLock = null;
    }
}

/**
 * Automatically manage wake lock based on visibility.
 * Call once on page load.
 */
export function initWakeLock(isMobile) {
    document.addEventListener("DOMContentLoaded", () => {
        if (isMobile) requestWakeLock();
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
			if (mobile) releaseWakeLock();
		} else {
			if (mobile) requestWakeLock();
		}
    });
}
