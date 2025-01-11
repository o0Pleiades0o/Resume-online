// navBarScroll
let lastScroll = 0;
const header = document.querySelector('.sticky-header');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 0) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Hide/show header based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past threshold - hide header
        header.classList.add('header-hidden');
    } else {
        // Scrolling up or at top - show header
        header.classList.remove('header-hidden');
    }

    lastScroll = currentScroll;
});

const projects = [
    {
        id: 1,
        title: "Gemicipe",
        description: "This is an application that use AI to suggest recipes based on user input with picture.",
        image: "assets/img/Gemicipe.png"
    },
    {
        id: 2,
        title: "Ledger Stacks",
        description: "Ledger Stacks is a application that allows users to create and manage stacks of ledgers.",
        image: "assets/img/Ledger Stack.png"
    },
    {
        id: 3,
        title: "Washmarine",
        description: "Washmarine is an innovative platform providing eco-friendly solutions for washing and laundry services.",
        image: "assets/img/Washmarine.png"
    },
    {
        id: 4,
        title: "Dog Classification",
        description: "Dog Classification is an AI-powered system for identifying dog breeds using TensorFlow.js.",
        image: "assets/img/Classification.png"
    }
];

let currentSlide = 0;
let autoSlideInterval;
const carousel = document.getElementById('carousel');
const dotsContainer = document.querySelector('.nav-dots');
const SLIDE_INTERVAL = 3000; // 3 seconds

function createCarouselItem(project) {
    return `
        <div class="carousel-container flex flex-col lg:flex-row items-center gap-8 p-4">
            <div class="w-full lg:w-1/2">
                <div class="aspect-video relative overflow-hidden rounded-lg shadow-2xl">
                    <img
                        src="${project.image}"
                        alt="${project.title}"
                        class="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div class="w-full lg:w-1/2 project-content">
                <h2 class="text-4xl font-bold mb-4">${project.title}</h2>
                <p class="text-lg text-gray-600 mb-6">
                    ${project.description}
                </p>
                <button class="btn btn-primary">View More</button>
            </div>
        </div>
    `;
}

function createDots() {
    dotsContainer.innerHTML = projects.map((_, index) => `
        <button
            onclick="goToSlide(${index})"
            class="w-3 h-3 rounded-full bg-gray-300 transition-colors duration-300"
            aria-label="Go to slide ${index + 1}"
        ></button>
    `).join('');
}

function updateSlide() {
    carousel.innerHTML = createCarouselItem(projects[currentSlide]);
    setTimeout(() => {
        const container = carousel.querySelector('.carousel-container');
        container.classList.add('active');
    }, 50);

    // Update dots
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    resetAutoSlide(); // Reset the timer when manually changing slides
    const container = carousel.querySelector('.carousel-container');
    container.classList.remove('active');
    setTimeout(() => {
        currentSlide = (currentSlide + 1) % projects.length;
        updateSlide();
    }, 500);
}

function prevSlide() {
    resetAutoSlide(); // Reset the timer when manually changing slides
    const container = carousel.querySelector('.carousel-container');
    container.classList.remove('active');
    setTimeout(() => {
        currentSlide = (currentSlide - 1 + projects.length) % projects.length;
        updateSlide();
    }, 500);
}

function goToSlide(index) {
    if (currentSlide === index) return;
    resetAutoSlide(); // Reset the timer when manually changing slides
    const container = carousel.querySelector('.carousel-container');
    container.classList.remove('active');
    setTimeout(() => {
        currentSlide = index;
        updateSlide();
    }, 500);
}

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Pause auto-slide when hovering over the carousel
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carousel.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Initialize carousel
createDots();
updateSlide();
startAutoSlide();

// Optional: Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// scrollToTopBtn
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});