/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.getElementById("open-popup").addEventListener("click", (e) => {
        console.log("open popup clicked");
    });
    console.log("listenForClicks loaded");
}

/**
 * add a click handler.
 */
console.log("22222")
listenForClicks()
console.log("11111")