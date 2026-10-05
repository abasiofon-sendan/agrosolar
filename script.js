/* ===============================
   MOBILE MENU (ALL PAGES)
================================ */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
}

/* ===============================
   ACTIVE NAV LINK (ALL PAGES)
================================ */
const links = document.querySelectorAll(".nav-btn");
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* Pitch */
/* =====================================================
   MOBILE NAVIGATION
   ===================================================== */

var navLinks = document.getElementById("navLinks");

function showMenu() {
    var panel = document.getElementById("navLinks");
    if (panel) {
        panel.classList.add("open");
    }
}

function hideMenu() {
    var panel = document.getElementById("navLinks");
    if (panel) {
        panel.classList.remove("open");
    }
}

/* =====================================================
   HEADER STATE BY SECTION (ALL PAGES)
   Switches the floating header between its dark-glass
   and light-cream states based on the section currently
   sitting under the header. No scroll listeners.
   ===================================================== */

(function () {
    var header = document.querySelector("header.glass-header");
    if (!header || !("IntersectionObserver" in window)) {
        return;
    }

    var watched = document.querySelectorAll("section[data-nav]");
    if (!watched.length) {
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                header.classList.toggle(
                    "nav-light",
                    entry.target.getAttribute("data-nav") === "light"
                );
            }
        });
    }, {
        rootMargin: "-40px 0px -85% 0px"
    });

    watched.forEach(function (section) {
        observer.observe(section);
    });
})();


/* =====================================================
   AGROSOLAR PITCH PRESENTATION
   ===================================================== */

/*
   All 12 presentation slides
   Make sure the filenames and folder name
   match your actual files exactly.
*/

const slides = [

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-01.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-02.PNG",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-03.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-04.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-05.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-06.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-07.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-08.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-09.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-10.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-11.png",

    "ASTIC_Solar_Harvest_Pitch_Desk/slide-12.png"

];


let currentSlideIndex = 0;


/* =====================================================
   DISPLAY SLIDE
   ===================================================== */

function showSlide(index) {

    const currentSlide = document.getElementById("currentSlide");
    const slideNumber = document.getElementById("slideNumber");

    if (!currentSlide || !slideNumber) {
        return;
    }


    /*
       Make sure the index stays within
       the available slides.
    */

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }


    currentSlideIndex = index;


    /*
       Change the displayed image.
    */

    currentSlide.src = slides[currentSlideIndex];


    /*
       Update the image alt text.
    */

    currentSlide.alt =
        "AgroSolar Pitch Presentation Slide " +
        (currentSlideIndex + 1);


    /*
       Update slide counter.
    */

    slideNumber.textContent =
        "Slide " +
        (currentSlideIndex + 1) +
        " of " +
        slides.length;


    /*
       Update thumbnail selection.
    */

    updateThumbnailSelection();

}


/* =====================================================
   NEXT SLIDE
   ===================================================== */

function nextSlide() {

    showSlide(currentSlideIndex + 1);

}


/* =====================================================
   PREVIOUS SLIDE
   ===================================================== */

function previousSlide() {

    showSlide(currentSlideIndex - 1);

}


/* =====================================================
   CREATE THUMBNAILS
   ===================================================== */

function createThumbnails() {

    const thumbnailsContainer =
        document.getElementById("thumbnails");


    if (!thumbnailsContainer) {
        return;
    }


    /*
       Clear existing thumbnails.
    */

    thumbnailsContainer.innerHTML = "";


    /*
       Create one thumbnail for each slide.
    */

    slides.forEach(function(slide, index) {

        const thumbnail =
            document.createElement("img");


        thumbnail.src = slide;


        thumbnail.alt =
            "Slide " + (index + 1);


        thumbnail.classList.add("slide-thumbnail");


        /*
           When thumbnail is clicked,
           display that slide.
        */

        thumbnail.addEventListener("click", function() {

            showSlide(index);

        });


        thumbnailsContainer.appendChild(thumbnail);

    });


    updateThumbnailSelection();

}


/* =====================================================
   HIGHLIGHT CURRENT THUMBNAIL
   ===================================================== */

function updateThumbnailSelection() {

    const thumbnails =
        document.querySelectorAll(".slide-thumbnail");


    thumbnails.forEach(function(thumbnail, index) {

        if (index === currentSlideIndex) {

            thumbnail.classList.add("active-thumbnail");

        } else {

            thumbnail.classList.remove("active-thumbnail");

        }

    });

}


/* =====================================================
   FULLSCREEN
   ===================================================== */

function openFullscreen() {

    const viewer =
        document.getElementById("slideViewer");


    if (!viewer) {
        return;
    }


    if (viewer.requestFullscreen) {

        viewer.requestFullscreen();

    } else if (viewer.webkitRequestFullscreen) {

        viewer.webkitRequestFullscreen();

    } else if (viewer.msRequestFullscreen) {

        viewer.msRequestFullscreen();

    }

}


/* =====================================================
   KEYBOARD NAVIGATION
   ===================================================== */

document.addEventListener("keydown", function(event) {

    /*
       Only activate keyboard slide controls
       when the pitch presentation exists.
    */

    const pitchViewer =
        document.getElementById("slideViewer");


    if (!pitchViewer) {
        return;
    }


    /*
       Right arrow = Next slide
    */

    if (event.key === "ArrowRight") {

        nextSlide();

    }


    /*
       Left arrow = Previous slide
    */

    else if (event.key === "ArrowLeft") {

        previousSlide();

    }


    /*
       Escape closes fullscreen automatically
       through the browser.
    */

});


/* =====================================================
   INITIALIZE PITCH PRESENTATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    /*
       Only initialize the pitch presentation
       when pitch.html is being displayed.
    */

    const currentSlide =
        document.getElementById("currentSlide");


    const thumbnails =
        document.getElementById("thumbnails");


    if (currentSlide && thumbnails) {

        showSlide(0);

        createThumbnails();

    }

});