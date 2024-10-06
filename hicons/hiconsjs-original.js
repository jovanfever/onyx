const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/jovanfever/onyx@41.0.0/hicons/icons';
const DEFAULT_SUFFIX = '-stroke-rounded';

function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

function getIconVariantSuffix(classList) {
    const classSuffixMap = {
        "hi-duotone": "-duotone-rounded",
        "hi-twotone": "-twotone-rounded",
        "hi-solid": "-solid-rounded",
        "hi-bulk": "-bulk-rounded",
        "hi-sharp-solid": "-solid-sharp",
        "hi-sharp-stroke": "-stroke-sharp",
        "hi-solid-standard": "-solid-standard",
        "hi-stroke-standard": "-stroke-standard",
    };

    for (const className in classSuffixMap) {
        if (classList.contains(className)) {
            return classSuffixMap[className];
        }
    }

    return DEFAULT_SUFFIX; // Default suffix
}

function loadHighIcons() {
    const icons = document.querySelectorAll(".hi-icon");
    icons.forEach((icon) => {
        let iconNameClass = null;
        for (const cl of icon.classList) {
            if (cl.startsWith('hicn-')) {
                iconNameClass = cl;
                break;
            }
        }

        if (iconNameClass) {
            const iconNameFormatted = iconNameClass.substring(5); // Remove "hicn-"
            const variantSuffix = getIconVariantSuffix(icon.classList);
            const imagePath = `${CDN_BASE_URL}/${iconNameFormatted}${variantSuffix}.svg`;

            // Preload the image
            preloadImage(imagePath);

            // Set the background image
            icon.style.backgroundImage = `url('${imagePath}')`;
        }
    });
}

document.addEventListener("DOMContentLoaded", loadHighIcons);