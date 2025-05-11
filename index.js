// Object to keep track of the current slide index for each slider
const slideIndices = {
    'student-slider': 0,
    'chef-slider': 0,
    'professor-slider': 0
};

// Function to change the slide
function changeSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    if (!slider) {
        console.error(Slider with ID ${sliderId} not found);
        return;
    }
    const slides = slider.querySelector('.slides');
    if (!slides) {
        console.error(Slides container not found in ${sliderId});
        return;
    }
    const pages = slides.querySelectorAll('.page');
    if (pages.length === 0) {
        console.error(No slides found in ${sliderId});
        return;
    }

    // Remove active class from current slide
    pages[slideIndices[sliderId]].classList.remove('active');

    // Update the slide index
    slideIndices[sliderId] += direction;

    // Loop back to the start or end if necessary
    if (slideIndices[sliderId] >= pages.length) {
        slideIndices[sliderId] = 0;
    } else if (slideIndices[sliderId] < 0) {
        slideIndices[sliderId] = pages.length - 1;
    }

    // Add active class to new slide
    pages[slideIndices[sliderId]].classList.add('active');

    // Move the slides container to show the current slide
    const offset = -slideIndices[sliderId] * 100;
    slides.style.transform = translateX(${offset}%);
}

// Initialize the sliders on page load
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(slideIndices).forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            const slides = slider.querySelector('.slides');
            if (slides) {
                const pages = slides.querySelectorAll('.page');
                if (pages.length > 0) {
                    // Set initial transform
                    slides.style.transform = 'translateX(0%)';
                    // Ensure the slides container has the correct width
                    slides.style.width = ${pages.length * 100}%;
                    // Add transition for smooth sliding
                    slides.style.transition = 'transform 0.5s ease-in-out';
                    // Ensure each page takes up the full width
                    pages.forEach(page => {
                        page.style.minWidth = '100%';
                    });
                    // Set the first slide as active
                    pages[0].classList.add('active');
                } else {
                    console.error(No slides found in ${sliderId});
                }
            } else {
                console.error(Slides container not found in ${sliderId});
            }
        } else {
            console.error(Slider with ID ${sliderId} not found);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Add sparkle effect to slides on hover
    const slides = document.querySelectorAll('.ppt-slide');
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle-effect');
            slide.appendChild(sparkle);
        });
    });
});