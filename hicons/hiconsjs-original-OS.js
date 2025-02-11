// Preload images in parallel
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Use a Map for faster lookups
const classSuffixMap = new Map([
    ["hi-duotone", "-duotone-rounded"],
    ["hi-twotone", "-twotone-rounded"],
    ["hi-solid", "-solid-rounded"],
    ["hi-bulk", "-bulk-rounded"],
    ["hi-sharp-solid", "-solid-sharp"],
    ["hi-sharp-stroke", "-stroke-sharp"],
    ["hi-solid-standard", "-solid-standard"],
    ["hi-stroke-standard", "-stroke-standard"],
]);

function getIconVariantSuffix(iconClasses) {
    for (const className of iconClasses) {
        if (classSuffixMap.has(className)) {
            return classSuffixMap.get(className);
        }
    }
    return "-stroke-rounded"; // Default suffix
}

function loadHighIcons() {
    const icons = document.querySelectorAll(".hi-icon");
    const iconUpdates = [];

    icons.forEach((icon) => {
        const iconClasses = icon.classList;
        const iconName = Array.from(iconClasses).find((cl) => cl.startsWith("hicn-"));

        if (iconName) {
            const iconNameFormatted = iconName.split("hicn-")[1];
            const variantSuffix = getIconVariantSuffix(iconClasses);
            const imagePath = `https://cdn.jsdelivr.net/gh/jovanfever/onyx@47.1.0/hicons/icons/${iconNameFormatted}${variantSuffix}.svg`;

            // Preload the image
            preloadImage(imagePath);

            // Collect updates to apply them later
            iconUpdates.push({ icon, imagePath });
        }
    });

    // Apply all updates in one batch
    iconUpdates.forEach(({ icon, imagePath }) => {
        icon.style.backgroundImage = `url('${imagePath}')`;
    });
}

document.addEventListener("DOMContentLoaded", loadHighIcons);