document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0; // Start at the first slide
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Function to change the slide visibility
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none'; // Only display the active slide
        });
    }

    // Navigate to the previous slide
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Calculate the previous slide index
        showSlide(currentIndex); // Show the previous slide
    }

    // Navigate to the next slide
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalSlides; // Calculate the next slide index
        showSlide(currentIndex); // Show the next slide
    }

    // Event listeners for previous and next navigation
    document.querySelector('.prev-arrow').addEventListener('click', goToPrev);
    document.querySelector('.next-arrow').addEventListener('click', goToNext);

    // Initialize the slider by showing the first slide
    showSlide(currentIndex);
});
