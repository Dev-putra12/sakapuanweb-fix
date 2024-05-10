/*=============================*/
/* Script for Navbar Toggler*/
/*=============================*/

$(document).ready(function () {
    const navbarToggler = $(".navbar-toggler");
    const navLinks = $(".nav-links");

    navbarToggler.on("click", function () {
        navLinks.toggleClass("active");
    });

    // Function to close navbar on larger screens
    function closeNavbarOnDesktop() {
        if ($(window).width() > 768) {
            navLinks.removeClass("active");
        }
    }

    $(window).on("resize", closeNavbarOnDesktop);
    $(window).on("DOMContentLoaded", closeNavbarOnDesktop);
});

/*=============================*/
/* Script for Slideshow/Carousel*/
/*=============================*/

$(document).ready(function () {
    const carousel = $(".carousel-container");
    const slides = carousel.find(".carousel-slide");
    const dotsContainer = carousel.find(".dots");
    const prevButton = carousel.find(".prev");
    const nextButton = carousel.find(".next");
    let currentIndex = 0;
    let intervalId;

    // Function to show the current slide
    function showSlide(index) {
        slides.removeClass("active");
        slides.eq(index).addClass("active");
        dotsContainer.find(".dot").removeClass("active-dot");
        dotsContainer.find(".dot").eq(index).addClass("active-dot");
    }

    // Function to show the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Function to show the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Create navigation dots
    const dots = [];
    for (let i = 0; i < slides.length; i++) {
        const dot = $("<span class='dot'></span>");
        dotsContainer.append(dot);
        dots.push(dot);
    }

    // Set initial active dot
    dots[currentIndex].addClass("active-dot");

    // Function to start autoplay
    function startAutoplay() {
        intervalId = setInterval(nextSlide, 5000);
    }

    // Function to stop autoplay
    function stopAutoplay() {
        clearInterval(intervalId);
    }

    // Show the initial slide
    showSlide(currentIndex);
    // Start autoplay
    startAutoplay();

    // Event listener for next button
    nextButton.on("click", function () {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    // Event listener for previous button
    prevButton.on("click", function () {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });
});

/*=============================*/
/* Script for count Up*/
/*=============================*/

let scrolled = false;

function countUp() {
    const counters = $(".count");

    counters.each(function () {
        const target = +$(this).data("target");
        const increment = Math.ceil(target / 100);
        let count = 0;

        const updateCount = () => {
            if (count < target) {
                $(this).text(count);
                count += increment;
                setTimeout(updateCount, 10);
            } else {
                $(this).text(target);
            }
        };

        updateCount();
    });
}

function resetCount() {
    scrolled = false;
    countUp();
}

$(window).on("load", countUp);

$(window).on("scroll", function () {
    if (!scrolled) {
        scrolled = true;
        resetCount();
    }
});

/*=============================*/
/* Script for photo slider*/
/*=============================*/

let currentSlide = 0;
let slideWidth;

const nextButton = $(".photo-next");
const prevButton = $(".photo-prev");

nextButton.on("click", nextSlide);
prevButton.on("click", previousSlide);

currentSlide = 3;

function nextSlide() {
    if (currentSlide < 7) {
        currentSlide++;
        updateSlider();
    }
}

function previousSlide() {
    if (currentSlide > 3) {
        currentSlide--;
        updateSlider();
    }
}

function updateSlider() {
    const slider = $(".slider");
    slideWidth = $(".slider img").width();
    const offset = -(currentSlide - 3) * slideWidth;
    slider.css("transform", "translateX(" + offset + "px)");
}
