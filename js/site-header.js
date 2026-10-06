/* =====================================================
   SITE HEADER + MOBILE DRAWER — SINGLE SOURCE OF TRUTH
   The 7-link list lives here ONCE as LINKS. This script
   renders BOTH the desktop header nav and the mobile
   drawer links from that same array, so they can never
   differ. Included synchronously at the top of <body>
   (no defer, no fetch): header + drawer exist before
   first paint, so there is no flash or layout shift.
   The drawer is injected as a direct child of <body>,
   outside the <header> element. Styling, behavior and
   active states reuse the existing CSS/JS untouched.
   ===================================================== */

(function () {
    var LINKS = [
        { label: "HOME", href: "index.html" },
        { label: "ABOUT", href: "about.html" },
        { label: "SERVICES", href: "services.html" },
        { label: "ACTIVITIES", href: "activities.html" },
        { label: "PITCH", href: "pitch.html" },
        { label: "BLOG", href: "blog.html" },
        { label: "CONTACT", href: "contact.html" }
    ];

    function currentPage() {
        var page = window.location.pathname.split("/").pop();
        if (!page) {
            page = "index.html";
        }
        return page;
    }

    function isActive(href) {
        return href.split("#")[0] === currentPage();
    }

    function desktopItems() {
        return LINKS.map(function (link) {
            var extra = isActive(link.href)
                ? ' class="active" aria-current="page"'
                : "";
            return '<li><a href="' + link.href + '"' + extra + ">" +
                link.label + "</a></li>";
        }).join("");
    }

    function drawerItems() {
        return LINKS.map(function (link) {
            var extra = isActive(link.href)
                ? ' class="drawer-link current" aria-current="page"'
                : ' class="drawer-link"';
            return '<li><a' + extra + ' href="' + link.href + '">' +
                link.label + "</a></li>";
        }).join("");
    }

    var headerHTML =
        '<header class="glass-header">' +
        '<a href="index.html" class="brand"><span class="logo-circle">' +
        '<img src="images/AgroSolar_logo.png" alt="AgroSolar ASTIC Logo">' +
        '</span><span class="wordmark">ASTIC</span></a>' +
        '<nav class="glass-nav">' +
        '<div class="nav-links" id="navLinks"><ul>' +
        desktopItems() +
        "</ul></div>" +
        '<button type="button" class="menu-btn" aria-controls="mobile-menu" ' +
        'aria-expanded="false" aria-label="Open menu">' +
        '<i class="fa fa-bars" aria-hidden="true"></i></button>' +
        "</nav>" +
        "</header>";

    var chromeHTML =
        '<div class="menu-backdrop" id="menuBackdrop" aria-hidden="true"></div>' +
        '<nav id="mobile-menu" aria-label="Main menu">' +
        '<div class="drawer-head">' +
        '<a href="index.html" class="drawer-brand">' +
        '<span class="logo-circle">' +
        '<img src="images/AgroSolar_logo.png" alt="AgroSolar ASTIC Logo">' +
        '</span><span class="drawer-wordmark">ASTIC</span></a>' +
        '<button type="button" class="drawer-close" aria-label="Close menu">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        "</div>" +
        '<ul class="drawer-links">' +
        drawerItems() +
        "</ul>" +
        "</nav>";

    var anchor = document.currentScript;
    if (!anchor) {
        return;
    }
    /* Header goes exactly where the script tag sits (top of body,
       where the hand-written header used to be). */
    anchor.insertAdjacentHTML("afterend", headerHTML);
    /* Drawer + backdrop become direct children of <body> so the
       header's backdrop-filter can never trap them, and so they
       sort after the header in DOM order. */
    document.body.insertAdjacentHTML("beforeend", chromeHTML);
})();
