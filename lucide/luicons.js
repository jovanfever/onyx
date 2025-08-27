function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

function loadLucideIcons() {
    const icons = document.querySelectorAll(".lu-icon");
    icons.forEach((icon) => {
        const iconClasses = new Set(icon.classList);
        const iconName = Array.from(iconClasses).find((cl) => cl.startsWith("luicn-"));

        if (iconName) {
            const iconNameFormatted = iconName.split("luicn-")[1];
            const imagePath = `https://cdn.jsdelivr.net/gh/jovanfever/onyx@56.0.0/lucide/icons/${iconNameFormatted}.svg`;

            // Preload the image
            preloadImage(imagePath);

            // Set the background image
            icon.style.backgroundImage = `url('${imagePath}')`;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadLucideIcons();
});