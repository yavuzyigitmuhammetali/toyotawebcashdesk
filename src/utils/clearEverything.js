export const clearEverything = async () => {
    sessionStorage.clear();

    localStorage.clear();

    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const name of cacheNames) {
            await caches.delete(name);
        }
    }

    if ('indexedDB' in window) {
        const databases = await indexedDB.databases();
        databases.forEach((db) => {
            indexedDB.deleteDatabase(db.name);
        });
    }

    /*    // Unregister all service workers
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
            }
        }*/

    setTimeout(() => {
        window.location.reload();
    }, 4000);
};