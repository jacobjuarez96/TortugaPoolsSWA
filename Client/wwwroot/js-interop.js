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

////////////////////////////////////////////////////////////////////////////////////////////
//              S C R O L L    T O    F O R M
////////////////////////////////////////////////////////////////////////////////////////////
function scrollToElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}



////////////////////////////////////////////////////////////////////////////////////////////
//              C H A N G E   P R O M P T    T E X T
////////////////////////////////////////////////////////////////////////////////////////////

function updateText(element) {
    if (element) {
        if (window.innerWidth < 500) {
            element.innerHTML = 'Touch <span style="color: #226393; font-style: italic;"> Go </span> to Schedule a Quote';
        } else {
            element.innerHTML = 'Click <span style="color: #226393; font-style: italic;"> Go </span> to Schedule a Quote';
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////
//              F O R M    B U T T O N    A N I M A T I O N
////////////////////////////////////////////////////////////////////////////////////////////


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



////////////////////////////////////////////////////////////////////////////////////////////
//              S T I C K Y    N A V B A R    A N D   H I D E
////////////////////////////////////////////////////////////////////////////////////////////


const body = document.body;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 100) {
        body.classList.remove('scroll-up');
    }

    if (currentScroll > lastScroll && !body.classList.contains('scroll-down') && currentScroll > 50) {
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



////////////////////////////////////////////////////////////////////////////////////////////
//              H A M B U R G E R    M E N U     S T U F F 
////////////////////////////////////////////////////////////////////////////////////////////

window.toggleMenu = () => {
    const menuButton = document.querySelector('#menu-but-id');
    const rootElement = document.documentElement;


    if (rootElement.hasAttribute('menu-open')) {
        rootElement.removeAttribute('menu-open');
    } else {
        rootElement.setAttribute('menu-open', '');
    }

    const menuLinks = document.querySelectorAll('.unstyled a'); 

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            rootElement.removeAttribute('menu-open');
        });
    });
}


////////////////////////////////////////////////////////////////////////////////////////////
//              L E N I S    S M O O T H    S C R O L L
////////////////////////////////////////////////////////////////////////////////////////////
const lenis = new Lenis()
function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)