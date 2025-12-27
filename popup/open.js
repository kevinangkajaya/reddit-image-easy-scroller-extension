/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {
        console.log(e)

        /**
         * Get the active tab,
         * then call "beastify()" or "reset()" as appropriate.
         */
        if (e.target.id === "open-popup") {
            console.log("here open-popup")
            return;
        }
    });
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.then(listenForClicks)