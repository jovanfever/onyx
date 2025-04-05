function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

function getIconVariantSuffix(iconClasses) {
    const classSuffixMap = {
        "ui-duotone": "duotone", 
        "ui-duocolor": "duocolor",
        "ui-solid": "solid",
        "ui-line": "line",
    };

    for (const [className, suffix] of Object.entries(classSuffixMap)) {
        if (iconClasses.has(className)) {
            return suffix;
        }
    }
    return "line"; // Default suffix
}

function loadHighIcons() {
    const icons = document.querySelectorAll(".ui-icon");
    icons.forEach((icon) => {
        const iconClasses = new Set(icon.classList);
        const iconName = Array.from(iconClasses).find((cl) => cl.startsWith("uicn-"));

        if (iconName) {
            const iconNameFormatted = iconName.split("uicn-")[1];
            const variantSuffix = getIconVariantSuffix(iconClasses);
            const imagePath = `https://cdn.jsdelivr.net/gh/jovanfever/onyx@51.0.0/uicons/${variantSuffix}/${iconNameFormatted}.svg`;

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