const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/jovanfever/onyx@47.1.0/fa6/svgs';

// Preload image function
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Use an object for faster property access
const folderMap = {
    "fa-regular": "regular",
    "fa-light": "light",
    "fa-brands": "brands",
    "fa-duotone": "duotone",
    "fa-duotone-thin": "duotone-thin",
    "fa-duotone-light": "duotone-light",
    "fa-duotone-regular": "duotone-regular",
    "fa-sharp-duotone-solid": "sharp-duotone-solid",
    "fa-sharp-duotone-thin": "sharp-duotone-thin",
    "fa-sharp-duotone-light": "sharp-duotone-light",
    "fa-sharp-duotone-regular": "sharp-duotone-regular",
    "fa-sharp-light": "sharp-light",
    "fa-sharp-regular": "sharp-regular",
    "fa-sharp-solid": "sharp-solid",
    "fa-sharp-thin": "sharp-thin",
    "fa-solid": "solid",
    "fa-thin": "thin",
};

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

function getFolderPath(classList) {
    // Check against the folderMap object for faster access
    for (const className in folderMap) {
        if (classList.contains(className)) {
            return folderMap[className];
        }
    }
    return null;
}

function getIconName(classList) {
    // Exclude classes in excludedStyles and folderMap keys
    for (const cls of classList) {
        if (
            cls.startsWith("fa-") &&
            !excludedStyles.has(cls) &&
            !(cls in folderMap)
        ) {
            return cls.slice(3); // Extract the part after "fa-"
        }
    }
    return null;
}

function getIconPath(classList) {
    const folderName = getFolderPath(classList);
    const iconName = getIconName(classList);

    if (folderName && iconName) {
        return `${CDN_BASE_URL}/${folderName}/${iconName}.svg`;
    }
    return null;
}

function loadFaIcons() {
    // Get all possible class names to look for based on folderMap keys
    const folderMapKeys = Object.keys(folderMap);
    const icons = document.querySelectorAll(folderMapKeys.map(key => `.${key}`).join(','));

    icons.forEach((icon) => {
        const classList = icon.classList;
        const iconPath = getIconPath(classList);

        if (iconPath) {
            preloadImage(iconPath);
            icon.style.backgroundImage = `url('${iconPath}')`;
        }
    });
}

document.addEventListener("DOMContentLoaded", loadFaIcons);