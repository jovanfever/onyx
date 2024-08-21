 // Preload image function
 function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Use Map for faster lookups
const folderMap = new Map([
    ["fa-regular", "regular"],
    ["fa-light", "light"],
    ["fa-brands", "brands"],
    ["fa-duotone", "duotone"],
    ["fa-sharp-duotone-solid", "sharp-duotone-solid"],
    ["fa-sharp-light", "sharp-light"],
    ["fa-sharp-regular", "sharp-regular"],
    ["fa-sharp-solid", "sharp-solid"],
    ["fa-sharp-thin", "sharp-thin"],
    ["fa-solid", "solid"],
    ["fa-thin", "thin"],
]);

// Excluded styles as a Set for faster membership checks
const excludedStyles = new Set([
    "fa-beat-effect",
    "fa-shake-effect",
    "fa-beat-fade-effect",
    "fa-fade-effect",
    "fa-bounce-effect",
    "fa-flip-effect",
    "fa-spin-effect",
    "fa-4x",
    "fa-3x",
    "fa-2x",
    "fa-1_5x",
    "fa-1_25x",
    "fa-fw"
]);

function getFolderPath(iconClasses) {
    // Check against the Map for faster access
    for (const className of iconClasses) {
        if (folderMap.has(className)) {
            return folderMap.get(className);
        }
    }
    return null;
}

function getIconName(iconClasses) {
    // Exclude classes in excludedStyles and folderMap keys
    for (const cls of iconClasses) {
        if (cls.startsWith("fa-") && !excludedStyles.has(cls) && !folderMap.has(cls)) {
            return cls.slice(3); // Extract the part after "fa-"
        }
    }
    return null;
}

function getIconPath(iconClasses) {
    const folderName = getFolderPath(iconClasses);
    const iconName = getIconName(iconClasses);

    if (folderName && iconName) {
        return `https://cdn.jsdelivr.net/gh/jovanfever/onyx@39.1.0/fa6/svgs/${folderName}/${iconName}.svg`;
    }
    return null;
}

function loadFaIcons() {
    // Get all possible class names to look for based on folderMap keys
    const folderMapKeys = Array.from(folderMap.keys());
    const icons = document.querySelectorAll(folderMapKeys.map(key => `.${key}`).join(','));
    const totalIcons = icons.length;

    for (let i = 0; i < totalIcons; i++) {
        const icon = icons[i];
        const iconClasses = new Set(icon.classList);

        const iconPath = getIconPath(iconClasses);

        if (iconPath) {
            preloadImage(iconPath);
            icon.style.backgroundImage = `url('${iconPath}')`;
        }
    }
}

document.addEventListener("DOMContentLoaded", loadFaIcons);