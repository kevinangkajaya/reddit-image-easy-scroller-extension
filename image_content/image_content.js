const getGalleryCarousel = () => {
    let urlParam = new URLSearchParams(window.location.search)
    const uniqueID = urlParam.get("unique-id") // get unique id from the URL

    browser.storage.session.get(uniqueID).then((result) => {
        const imgSrc = result[uniqueID] // imgSrc is a set

        console.log(imgSrc)

        browser.storage.session.remove(uniqueID)
    })
}

getGalleryCarousel();