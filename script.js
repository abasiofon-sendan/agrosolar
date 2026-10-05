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

/* =====================================================
   MOBILE DRAWER NAVIGATION (ALL PAGES)
   Full-height slide-in drawer (<nav id="mobile-menu">),
   a direct child of <body> and sibling of the header.
   No scroll listeners.
   ===================================================== */

/* The drawer markup sits after the scripts at the end of <body>,
   so initialization waits for parsing to finish. */
document.addEventListener("DOMContentLoaded", function () {
    var drawer = document.getElementById("mobile-menu");
    var backdrop = document.getElementById("menuBackdrop");
    var burger = document.querySelector(".menu-btn");
    if (!drawer || !backdrop || !burger) {
        return;
    }
    var closeBtn = drawer.querySelector(".drawer-close");
    if (!closeBtn) {
        return;
    }

    var links = Array.prototype.slice.call(
        drawer.querySelectorAll(".drawer-link")
    );
    var mq = window.matchMedia("(max-width: 768px)");
    var opener = null;

    /* Same links as the header; mark the current page. */
    var current =
        window.location.pathname.split("/").pop() || "index.html";
    links.forEach(function (link, index) {
        link.style.setProperty("--j", index);
        if (link.getAttribute("href") === current) {
            link.classList.add("current");
            link.setAttribute("aria-current", "page");
        }
    });

    function pageSiblings() {
        return Array.prototype.slice.call(
            document.querySelectorAll(
                "body > :not(#mobile-menu):not(.menu-backdrop):not(script)"
            )
        );
    }

    function openDrawer() {
        if (document.body.classList.contains("menu-open") || !mq.matches) {
            return;
        }
        opener = document.activeElement;
        /* Lock scroll without a layout jump. */
        var gutter =
            window.innerWidth - document.documentElement.clientWidth;
        if (gutter > 0) {
            document.body.style.paddingRight = gutter + "px";
        }
        document.body.classList.add("menu-open");
        burger.setAttribute("aria-expanded", "true");
        pageSiblings().forEach(function (el) {
            el.setAttribute("inert", "");
        });
        closeBtn.focus();
    }

    function closeDrawer() {
        if (!document.body.classList.contains("menu-open")) {
            return;
        }
        document.body.classList.remove("menu-open");
        document.body.style.paddingRight = "";
        burger.setAttribute("aria-expanded", "false");
        pageSiblings().forEach(function (el) {
            el.removeAttribute("inert");
        });
        if (opener && document.contains(opener)) {
            opener.focus();
        } else {
            burger.focus();
        }
        opener = null;
    }

    burger.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);
    /* Any link tap closes first; the default jump follows. */
    links.forEach(function (link) {
        link.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", function (event) {
        if (!document.body.classList.contains("menu-open")) {
            return;
        }
        if (event.key === "Escape") {
            event.preventDefault();
            closeDrawer();
        } else if (event.key === "Tab") {
            var focusable = Array.prototype.slice
                .call(drawer.querySelectorAll("a[href], button:not([disabled])"))
                .filter(function (el) {
                    return el.offsetParent !== null;
                });
            if (focusable.length === 0) {
                return;
            }
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    function closeWhenWide(event) {
        if (!event.matches) {
            closeDrawer();
        }
    }
    if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", closeWhenWide);
    } else if (typeof mq.addListener === "function") {
        mq.addListener(closeWhenWide);
    }
});

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

/* =====================================================
   GALLERY LIGHTBOX (index.html only)
   Native <dialog>; photo tiles use data-full, video
   tiles (data-video) open an embedded player instead.
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    var section = document.getElementById("gallery");
    if (!section) {
        return;
    }

    var tiles = Array.prototype.slice.call(
        section.querySelectorAll(".gal-tile")
    );
    var dialog = document.getElementById("galDialog");
    if (!dialog || tiles.length === 0) {
        return;
    }

    /* No native <dialog>: fall back to opening the full image. */
    if (typeof dialog.showModal !== "function") {
        tiles.forEach(function (tile) {
            tile.addEventListener("click", function () {
                var img = tile.querySelector("img");
                window.open(tile.getAttribute("data-full") ||
                    (img && img.getAttribute("src")), "_blank");
            });
        });
        return;
    }

    var viewImg = document.getElementById("galView");
    var viewVideo = document.getElementById("galVideo");
    var caption = document.getElementById("galCap");
    var counter = document.getElementById("galCount");
    var closeBtn = document.getElementById("galClose");
    var prevBtn = document.getElementById("galPrev");
    var nextBtn = document.getElementById("galNext");
    var inner = document.getElementById("galDialogInner");

    var current = 0;
    var opener = null;

    function stopVideo() {
        if (!viewVideo) {
            return;
        }
        viewVideo.pause();
        viewVideo.removeAttribute("src");
        viewVideo.hidden = true;
    }

    function render() {
        var tile = tiles[current];
        var img = tile.querySelector("img");
        var alt = (img && img.getAttribute("alt")) || "";
        var videoSrc = tile.getAttribute("data-video");

        stopVideo();

        if (videoSrc) {
            viewImg.hidden = true;
            viewVideo.hidden = false;
            viewVideo.setAttribute("poster",
                (img && img.currentSrc) || (img && img.getAttribute("src")) || "");
            viewVideo.setAttribute("src", videoSrc);
        } else {
            viewImg.hidden = false;
            viewImg.setAttribute("src", tile.getAttribute("data-full") ||
                (img && img.getAttribute("src")));
            viewImg.setAttribute("alt", alt);
        }

        caption.textContent = alt;
        counter.textContent = (current + 1) + " / " + tiles.length;
        prevBtn.setAttribute("aria-label",
            "Previous image (" + (((current - 1 + tiles.length) % tiles.length) + 1) +
            " of " + tiles.length + ")");
        nextBtn.setAttribute("aria-label",
            "Next image (" + (((current + 1) % tiles.length) + 1) +
            " of " + tiles.length + ")");
    }

    function openAt(index, tile) {
        current = (index + tiles.length) % tiles.length;
        opener = tile || null;
        render();
        if (!dialog.open) {
            dialog.showModal();
        }
        document.body.classList.add("gal-lock");
        closeBtn.focus();
    }

    function closeViewer() {
        if (dialog.open) {
            dialog.close();
        }
    }

    function step(delta) {
        current = (current + delta + tiles.length) % tiles.length;
        render();
    }

    tiles.forEach(function (tile, index) {
        tile.addEventListener("click", function () {
            openAt(index, tile);
        });
    });

    closeBtn.addEventListener("click", closeViewer);
    prevBtn.addEventListener("click", function () { step(-1); });
    nextBtn.addEventListener("click", function () { step(1); });

    /* Backdrop click (outside the figure and buttons) closes. */
    dialog.addEventListener("click", function (event) {
        if (event.target === dialog || event.target === inner) {
            closeViewer();
        }
    });

    dialog.addEventListener("close", function () {
        stopVideo();
        document.body.classList.remove("gal-lock");
        if (opener && document.contains(opener)) {
            opener.focus();
        }
        opener = null;
    });

    dialog.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
        }
    });

    /* Touch swipe left/right to navigate. */
    var touchX = null;
    inner.addEventListener("touchstart", function (event) {
        if (event.touches.length === 1) {
            touchX = event.touches[0].clientX;
        }
    }, { passive: true });
    inner.addEventListener("touchend", function (event) {
        if (touchX === null) {
            return;
        }
        var dx = event.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 40) {
            step(dx < 0 ? 1 : -1);
        }
    }, { passive: true });

});
