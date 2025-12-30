const getActiveTab = async () => {
    let tabs = await browser.tabs.query({ active: true, currentWindow: true })

    var currTab = tabs[0];
    if (currTab) { // Sanity check
        return currTab
    } else {
        throw new Error("No currTab")
    }
}

const testing = () => {

    getActiveTab().then((activeTab) => {

        browser.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => {
                document.body.style.border = "5px solid blue";
                console.log(document.body.style.border)
            }
        })
    })
}

const onError = (err) => {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");

    document.querySelector("#error-content-detail").setHTMLUnsafe(err);
}

const findGalleryCarousel = async () => {
    let activeTab = await getActiveTab()

    const imgSrc = await browser.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: () => {
            // ============================ find gallery carousel ============================
            const galleryCarousels = document.getElementsByTagName('gallery-carousel')

            // ============================ find images on reddit ============================
            const imgSrc = new Set();
            for (const galleryCarousel of galleryCarousels) {

                const lis = galleryCarousel.getElementsByTagName('li')

                for (const li of lis) {
                    const imgs = li.getElementsByTagName('img')

                    for (const img of imgs) {
                        // ========================= append image sources =========================
                        if (img.src) {
                            imgSrc.add(img.src)
                        } else if (img.getAttribute("data-src")) {
                            imgSrc.add(img.getAttribute("data-src"))
                        } else if (img.getAttribute("data-lazy-src")) {
                            imgSrc.add(img.getAttribute("data-lazy-src"))
                        }
                    }
                }
            }

            return imgSrc;

        }
    })

    // browser.scripting.executeScript returns result stored in array of object with 'result' key
    if (imgSrc.length == 1 && imgSrc[0].result) {
        return imgSrc[0].result;
    } else {
        throw new Error("Invalid imgSrc", imgSrc)
    }
}


/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
const listenForClicks = () => {

    document.getElementById("open-popup").addEventListener("click", (e) => {

        // ========================= find gallery carousel =========================
        findGalleryCarousel().then((imgSrc) => {
            if (imgSrc.size === 0) {
                throw new Error("No pictures or only 1 picture present, requires multiple pictures")
            }

            // ======================= make new unique id =======================
            const newID = `image-content-${crypto.randomUUID()}`;

            // ======================= create local storage =======================
            browser.storage.session.set({
                [newID]: imgSrc
            })

            // ========================= create new tab =========================
            let urlParam = new URLSearchParams()
            urlParam.set("unique-id", newID)

            browser.tabs.create({
                url: "/image_content/image_content.html?" + urlParam.toString()
            })

        }).catch((err) => {
            onError(err)
        })
    });

}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
listenForClicks()
// testing()
