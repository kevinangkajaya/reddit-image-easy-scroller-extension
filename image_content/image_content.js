const getGalleryCarousel = () => {
    let urlParam = new URLSearchParams(window.location.search)
    const uniqueID = urlParam.get("unique-id") // get unique id from the URL

    browser.storage.session.get(uniqueID).then((result) => {
        const imgSrc = result[uniqueID] // imgSrc is a set

        console.log(imgSrc)
        browser.storage.session.remove(uniqueID)

        let htmlContent = '';
        for (const src of imgSrc) {
            htmlContent += `<div>
                <img class="image-content-img" src="${src}" loading="lazy" />
            </div>
            <hr />`
        }

        document.getElementById("image-content").setHTMLUnsafe(htmlContent)
    })
}

const createZoomOptions = () => {
    let htmlContent = '';

    for (let i = 10; i <= 200; i += 10) {
        htmlContent += `<option 
            value="${i}" 
            ${i === 100 ? "selected" : ""}
        >${i}%</option>`
    }
    document.getElementById("zoom").setHTMLUnsafe(htmlContent)
}

const zoomOnChange = () => {
    document.getElementById("zoom").addEventListener("click", (e) => {
        const selectedValue = e.target.value;

        const imgs = document.getElementsByClassName("image-content-img")
        for (const img of imgs) {
            const naturalWidth = img.naturalWidth;
            img.style.width = `${parseInt(selectedValue) / 100 * naturalWidth}px`;
        }
    })
}

getGalleryCarousel();
createZoomOptions();
zoomOnChange();