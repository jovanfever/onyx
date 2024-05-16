document.addEventListener("DOMContentLoaded", function() {
    // Get the current script's URL (assuming the script is the last one loaded)
    const scripts = document.getElementsByTagName('script');
    const currentScriptPath = scripts[scripts.length - 1].src;
    // Select all elements that have the 'hi-icon' class
    const icons = document.querySelectorAll('.hi-icon');

    icons.forEach(function(icon) {
        const iconName = Array.from(icon.classList).find(cl => cl.startsWith('hicn-'));
        let variantSuffix = '-stroke-rounded'; // Default suffix
        if (icon.classList.contains('hi-duotone')) variantSuffix = '-duotone-rounded';
        else if (icon.classList.contains('hi-twotone')) variantSuffix = '-twotone-rounded';
        else if (icon.classList.contains('hi-solid')) variantSuffix = '-solid-rounded';
        else if (icon.classList.contains('hi-bulk')) variantSuffix = '-bulk-rounded';
        else if (icon.classList.contains('hi-sharp-solid')) variantSuffix = '-solid-sharp';
        else if (icon.classList.contains('hi-sharp-stroke')) variantSuffix = '-stroke-sharp';

        if (iconName) {
            const iconNameFormatted = iconName.split('hi-')[1]; // Extract the actual icon name
            const imagePath = `https://cdn.jsdelivr.net/gh/jovanfever/onyx@29/hicons/icons/${iconNameFormatted}${variantSuffix}.svg`;
            icon.style.backgroundImage = `url('${imagePath}')`;
        }
    });
});