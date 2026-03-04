// Improved live reload script

function liveReload() {
    const cssReloadDelay = 1000; // Debounce delay for CSS reload
    let cssTimer;

    const reloadCSS = () => {
        clearTimeout(cssTimer);
        cssTimer = setTimeout(() => {
            // Logic for refreshing CSS styles
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                const newLink = link.cloneNode();
                newLink.href = link.href.split('?')[0] + '?' + new Date().getTime();
                link.parentNode.insertBefore(newLink, link.nextSibling);
                link.remove();
            });
        }, cssReloadDelay);
    };

    const configurePolling = (interval) => {
        setInterval(() => {
            // Logic for checking changes in files
            fetch('/path/to/check/updates')
                .then(response => response.json())
                .then(data => {
                    if (data.updated) {
                        reloadCSS();
                    }
                });
        }, interval);
    };

    const cleanup = () => {
        // Logic for cleanup
        // E.g., remove event listeners or terminate connections if needed
    };

    // Initiate live reload with configurable polling
    configurePolling(5000); // Poll every 5 seconds

    // Cleanup on unload
    window.addEventListener('beforeunload', cleanup);
}

liveReload();