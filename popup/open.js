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

    return imgSrc;
}


/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
const listenForClicks = () => {

    document.getElementById("open-popup").addEventListener("click", (e) => {
        console.log(e)

        findGalleryCarousel().then((imgSrc) => {

            console.log(imgSrc)
            // browser.tabs.create({
            //     url: "/image_content/image_content.html"
            // })

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
