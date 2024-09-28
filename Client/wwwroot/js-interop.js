window.swiperFunctions = {
    initializeSwiper: function () {


        //google review swiper
        var reviewsSwiper = new Swiper("#reviews-swiper", {
            //swiper-custom-nav
            navigation: {
                nextEl: "#nav-right",
                prevEl: "#nav-left"
            },
            loop: true,
            spaceBetween: 100
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////
        /*The cubes*/
        /////////////

        var cleaningSwiper = new Swiper("#cleaningSwiper", {
            effect: "cube",
            cubeEffect: {
                shadow: false,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.9,
            },
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: "#right-arrow",
            },
            loop: true
        });

        var maintenanceSwiper = new Swiper("#maintenanceSwiper", {
            effect: "cube",
            cubeEffect: {
                shadow: false,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.9,
            },
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: "#right-arrow",
            },
            loop: true,
        });

        var chemicalsSwiper = new Swiper("#chemicalsSwiper", {
            effect: "cube",
            cubeEffect: {
                shadow: false,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.9,
            },
            pagination: {
                el: ".swiper-pagination",
            },
            navigation: {
                nextEl: "#right-arrow",
            },
            loop: true,
        });

        // Store Swiper instances for later use
        window.currentSwipers = {
            reviewsSwiper: reviewsSwiper,
            cleaningSwiper: cleaningSwiper,
            maintenanceSwiper: maintenanceSwiper,
            chemicalsSwiper: chemicalsSwiper
        };
    },

    cleanupSwiper: function () {

        if (window.currentSwipers) {
            for (const key in window.currentSwipers) {
                if (window.currentSwipers[key]) {
                    window.currentSwipers[key].destroy(true, true);
                }
            }
            window.currentSwipers = null;
        }
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Function to handle intersection events
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible'); // Add a class to trigger animation
            observer.unobserve(entry.target); // Stop observing once the element is visible
        }
    });
}

// Initialize IntersectionObserver
const observer = new IntersectionObserver(handleIntersection, {
    root: null, // viewport
    threshold: 0.2 // trigger when 50% of the element is visible
});

// Export function to observe an element
window.observeElement = function (element) {
    if (element instanceof Element) {
        observer.observe(element);
    }
    else { console.error('Parameter is not a valid dom element') }
};

function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

const submitButton = document.getElementById('form-button')
const submitButtonText = document.querySelector('#form-button .button-text')
const navLinks = document.querySelector('.nav-links-sec')
const navButton = document.querySelector('nav-button-sec')

function animateButtonLoading() {
    const submitButton = document.getElementById('form-button')
    if (submitButton) {
        submitButton.classList.add('loading');
    } else {
        console.log("Button not found");
    }
}

function animateButtonSuccess() {
    const submitButton = document.getElementById('form-button')
    const submitButtonText = document.querySelector('#form-button .button-text')

    if (submitButton) {
        submitButton.classList.remove('loading');
        submitButton.classList.add('success');
        submitButtonText.innerHTML = "Sent!";
    } else {
        console.log("Button not found");
    }
}


const body = document.body;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        body.classList.remove('scroll-up');
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-up');
        body.classList.add('scroll-down');
    }

    if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
        body.classList.remove('scroll-down');
        body.classList.add('scroll-up');

    }

    lastScroll = currentScroll;
});

const menuButton = document.querySelector('#menu-but-id');
const rootElement = document.documentElement;



window.toggleMenu = () => {
    const menuButton = document.querySelector('#menu-but-id');
    const rootElement = document.documentElement;


    if (rootElement.hasAttribute('menu-open')) {
        rootElement.removeAttribute('menu-open');
    } else {
        rootElement.setAttribute('menu-open', '');
    }
}

window.toggleMenu2 = () => {
    const menuButton = document.querySelector('#menu-but-id-sec');
    const rootElement = document.documentElement;

    if (rootElement.hasAttribute('menu-open')) {
        rootElement.removeAttribute('menu-open');
    } else {
        rootElement.setAttribute('menu-open', '');
    }
}


//Lenis smooth scroll
const lenis = new Lenis()
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)