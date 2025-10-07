function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

function getIconVariantSuffix(iconClasses) {
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

    for (const [className, suffix] of Object.entries(classSuffixMap)) {
        if (iconClasses.has(className)) {
            return suffix;
        }
    }
    return "-stroke-rounded"; // Default suffix
}

function loadHighIcons() {
    const icons = document.querySelectorAll(".hi-icon");
    icons.forEach((icon) => {
        const iconClasses = new Set(icon.classList);
        const iconName = Array.from(iconClasses).find((cl) => cl.startsWith("hicn-"));

        if (iconName) {
            const iconNameFormatted = iconName.split("hicn-")[1];
            const variantSuffix = getIconVariantSuffix(iconClasses);
            const imagePath = `https://cdn.jsdelivr.net/gh/jovanfever/onyx@58.0.0/hicons/icons/${iconNameFormatted}${variantSuffix}.svg`;

            // Preload the image
            preloadImage(imagePath);

            // Set the background image
            icon.style.backgroundImage = `url('${imagePath}')`;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadHighIcons();
});