document.body.style.border = "5px solid blue";

const createOpenImageContentButton = () => {
    // ============================ find gallery carousel ============================
    const galleryCarousels = document.getElementsByTagName('gallery-carousel')

    // ======================= append button to gallery carousel =======================
    const button = document.createElement('button')
    button.textContent = "Open Reddit Image Easy Scroller"
    button.onclick = () => {
        console.log('button clicked')
    }

    for (const galleryCarousel of galleryCarousels) {

        // ======================= when gallery carousel is loaded =======================
        galleryCarousel.onload = () => {
            console.log('success load')
            findGalleryCarousel(galleryCarousel);
        }

        // ======================= when gallery carousel is error =======================
        galleryCarousel.onerror = () => {
            console.log('success load')
        }

        console.log(galleryCarousel)

        galleryCarousel.appendChild(button)
    }
}

const findGalleryCarousel = (galleryCarousel) => {

    // ============================ find images on reddit ============================
    const imgSrc = [];

    const lis = galleryCarousel.getElementsByTagName('li')

    for (const li of lis) {
        const imgs = li.getElementsByTagName('img')

        for (const img of imgs) {
            imgSrc.push(img.src)
        }
    }

    console.log(imgSrc)
    browser.tabs.create({
        url: bro
    })
}

createOpenImageContentButton();
