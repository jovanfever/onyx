document.addEventListener("DOMContentLoaded", function() {
    // Select all elements that have the 'hi-icon' class
    const icons = document.querySelectorAll('.hi-icon');

    icons.forEach(function(icon) {
        // Extract the base icon class
        const iconName = Array.from(icon.classList).find(cl => cl.startsWith('hi-') && cl !== 'hi-icon');

        // Determine the variant based on additional classes, defaulting to -stroke-rounded
        let variantSuffix = '-stroke-rounded'; // Default suffix
        if (icon.classList.contains('hi-duotone')) variantSuffix = '-duotone-rounded';
        else if (icon.classList.contains('hi-twotone')) variantSuffix = '-twotone-rounded';
        else if (icon.classList.contains('hi-solid')) variantSuffix = '-solid-rounded';
        else if (icon.classList.contains('hi-bulk')) variantSuffix = '-bulk-rounded';
        else if (icon.classList.contains('hi-sharp-solid')) variantSuffix = '-solid-sharp';
        else if (icon.classList.contains('hi-sharp-stroke')) variantSuffix = '-stroke-sharp';

        // Construct the SVG filename
        if (iconName) {
            const iconNameFormatted = iconName.split('hi-')[1]; // Extract the actual icon name
            const imagePath = `/icons/${iconNameFormatted}${variantSuffix}.svg`;

            // Set the background image to match the SVG filename
            icon.style.backgroundImage = `url('${imagePath}')`;
        }
    });
});