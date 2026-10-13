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
   ACTIVITIES owns one child (Student Research), shown as
   a hover/click dropdown on desktop and as an indented
   always-visible link in the mobile drawer.
   ===================================================== */

(function () {
    var LINKS = [
        { label: "HOME", href: "index" },
        { label: "ABOUT", href: "about" },
        { label: "SERVICES", href: "services" },
        { label: "ACTIVITIES", href: "activities",
          children: [{ label: "Student Research",
                       href: "student-research" }] },
        { label: "PITCH", href: "pitch" },
        { label: "BLOG", href: "blog" },
        { label: "CONTACT", href: "contact" }
    ];

    function currentPage() {
        var page = window.location.pathname.split("/").pop();
        if (!page) {
            page = "index.html";
        }
        return page.split("#")[0].split("?")[0];
    }

    /* Base filename without extension, lowercase. */
    function base(href) {
        return href.split("#")[0].split("?")[0]
            .split("/").pop().replace(/\.html?$/i, "").toLowerCase();
    }

    /* Prefix-style match with no per-page hardcoding: exact, either
       direction prefix, or related trailing segment (so research
       resolves to the student-research child). */
    function matches(href) {
        var page = base(currentPage());
        var target = base(href);
        if (!target || !page) {
            return false;
        }
        return page === target ||
            page.indexOf(target) === 0 ||
            target.indexOf(page) === 0 ||
            target.slice(-page.length) === page;
    }

    function childActive(link) {
        return (link.children || []).some(function (child) {
            return matches(child.href);
        });
    }

    function esc(s) {
        return String(s).replace(/&/g, "&amp;")
            .replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function desktopItems() {
        return LINKS.map(function (link) {
            var kids = link.children || [];
            var self = matches(link.href) && base(currentPage()) === base(link.href);
            var viaKid = childActive(link);
            if (kids.length === 0) {
                var extra = matches(link.href)
                    ? ' class="active" aria-current="page"'
                    : "";
                return '<li><a href="' + link.href + '"' + extra + ">" +
                    esc(link.label) + "</a></li>";
            }
            var parentCls = (self || viaKid) ? "active" : "";
            var parentCur = self
                ? ' aria-current="page"'
                : (viaKid ? ' aria-current="true"' : "");
            var id = "submenu-" + base(link.href);
            var out = '<li class="has-sub">' +
                '<a href="' + link.href + '"' +
                (parentCls ? ' class="' + parentCls + '"' : "") +
                parentCur + ">" + esc(link.label) + "</a>" +
                '<button type="button" class="sub-toggle" aria-label="' +
                esc(link.label.charAt(0) + link.label.slice(1).toLowerCase()) +
                ' submenu" aria-haspopup="true" aria-expanded="false" ' +
                'aria-controls="' + id + '">' +
                '<i class="fa fa-chevron-down" aria-hidden="true"></i></button>' +
                '<div class="submenu" id="' + id + '"><ul>';
            out += kids.map(function (child) {
                var on = matches(child.href);
                return '<li><a href="' + child.href + '"' +
                    (on ? ' class="active" aria-current="page"' : "") +
                    ">" + esc(child.label) + "</a></li>";
            }).join("");
            return out + "</ul></div></li>";
        }).join("");
    }

    function drawerItems() {
        return LINKS.map(function (link) {
            var kids = link.children || [];
            var self = matches(link.href) && base(currentPage()) === base(link.href);
            var viaKid = childActive(link);
            var parentOn = self || viaKid;
            if (kids.length === 0) {
                return '<li><a class="drawer-link' +
                    (matches(link.href) ? " current" : "") + '"' +
                    (matches(link.href) ? ' aria-current="page"' : "") +
                    ' href="' + link.href + '">' + esc(link.label) + "</a></li>";
            }
            /* Expandable group: label stays a plain link, chevron toggles. */
            var defOpen = viaKid && !self;
            var subId = "drawer-sub-" + base(link.href);
            var out = '<li class="drawer-group' + (defOpen ? " open" : "") +
                '" data-default="' + (defOpen ? "true" : "false") + '">' +
                '<div class="drawer-group-row">' +
                '<a class="drawer-link' + (parentOn ? " current" : "") + '"' +
                (self ? ' aria-current="page"' :
                    (viaKid ? ' aria-current="true"' : "")) +
                ' href="' + link.href + '">' + esc(link.label) + "</a>" +
                '<button type="button" class="drawer-toggle" aria-label="' +
                esc(link.label.charAt(0) + link.label.slice(1).toLowerCase()) +
                ' submenu" aria-expanded="' + (defOpen ? "true" : "false") +
                '" aria-controls="' + subId + '">' +
                '<i class="fa fa-chevron-down" aria-hidden="true"></i></button>' +
                "</div>" +
                '<div class="drawer-panel" id="' + subId + '"' +
                (defOpen ? "" : " hidden inert") + "><ul>";
            out += kids.map(function (child) {
                var on = matches(child.href);
                return '<li><a class="drawer-link drawer-sub-link' +
                    (on ? " current" : "") + '"' +
                    (on ? ' aria-current="page"' : "") +
                    ' href="' + child.href + '">' + esc(child.label) +
                    "</a></li>";
            }).join("");
            return out + "</ul></div></li>";
        }).join("");
    }

    var headerHTML =
        '<header class="glass-header">' +
        '<a href="index" class="brand"><span class="logo-circle">' +
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
        '<a href="index" class="drawer-brand">' +
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

    /* ---------- Desktop submenu controller (one instance per .has-sub) ---------- */
    Array.prototype.forEach.call(
        document.querySelectorAll(".glass-header .has-sub"),
        function (group) {
            var toggle = group.querySelector(".sub-toggle");
            var panel = group.querySelector(".submenu");
            if (!toggle || !panel) {
                return;
            }
            var items = Array.prototype.slice.call(
                panel.querySelectorAll("a[href]"));

            function open() {
                group.classList.add("open");
                toggle.setAttribute("aria-expanded", "true");
            }

            function close() {
                group.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            }

            function isOpen() {
                return group.classList.contains("open");
            }

            toggle.addEventListener("click", function () {
                if (isOpen()) {
                    close();
                } else {
                    open();
                }
            });

            toggle.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    if (isOpen()) {
                        close();
                    } else {
                        open();
                        if (items[0]) {
                            items[0].focus();
                        }
                    }
                } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    open();
                    if (items[0]) {
                        items[0].focus();
                    }
                } else if (event.key === "Escape") {
                    close();
                }
            });

            panel.addEventListener("keydown", function (event) {
                var at = items.indexOf(document.activeElement);
                if (event.key === "Escape") {
                    event.preventDefault();
                    close();
                    toggle.focus();
                } else if (event.key === "ArrowDown") {
                    event.preventDefault();
                    items[(at + 1) % items.length].focus();
                } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    if (at <= 0) {
                        toggle.focus();
                    } else {
                        items[at - 1].focus();
                    }
                } else if (event.key === "Tab" && !event.shiftKey &&
                           at === items.length - 1) {
                    close();
                }
            });

            /* Focus leaving the whole group closes the panel. */
            group.addEventListener("focusout", function () {
                window.setTimeout(function () {
                    if (!group.contains(document.activeElement)) {
                        close();
                    }
                }, 0);
            });

            /* Mouse leaving the group closes a click-opened panel;
               hover-opening itself is pure CSS. */
            group.addEventListener("mouseleave", function () {
                close();
            });

            document.addEventListener("click", function (event) {
                if (!group.contains(event.target)) {
                    close();
                }
            });

            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape" && isOpen()) {
                    close();
                    if (group.contains(document.activeElement)) {
                        toggle.focus();
                    }
                }
            });
        }
    );

    /* ---------- Mobile drawer accordion (one group open at a time) ---------- */
    var drawerGroups = Array.prototype.slice.call(
        document.querySelectorAll("#mobile-menu .drawer-group"));

    function setDrawerGroup(group, open, instant) {
        var toggle = group.querySelector(".drawer-toggle");
        var panel = group.querySelector(".drawer-panel");
        if (!toggle || !panel) {
            return;
        }
        if (group._t) {
            window.clearTimeout(group._t);
            group._t = null;
        }
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
            panel.hidden = false;
            panel.removeAttribute("inert");
            /* Two frames so the slide transition runs from 0fr. */
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    group.classList.add("open");
                });
            });
        } else {
            group.classList.remove("open");
            panel.setAttribute("inert", "");
            if (instant) {
                panel.hidden = true;
            } else {
                group._t = window.setTimeout(function () {
                    if (!group.classList.contains("open")) {
                        panel.hidden = true;
                    }
                    group._t = null;
                }, 260);
            }
        }
    }

    function drawerDefault(group) {
        return group.getAttribute("data-default") === "true";
    }

    drawerGroups.forEach(function (group) {
        var toggle = group.querySelector(".drawer-toggle");
        if (!toggle) {
            return;
        }
        /* Native button semantics: Enter/Space fire click, focus stays. */
        toggle.addEventListener("click", function () {
            var willOpen = !group.classList.contains("open");
            drawerGroups.forEach(function (other) {
                if (other !== group) {
                    setDrawerGroup(other, false);
                }
            });
            setDrawerGroup(group, willOpen);
        });
    });

    /* Closing the drawer resets every group to its page default. */
    if (typeof MutationObserver !== "undefined" && document.body) {
        new MutationObserver(function () {
            if (!document.body.classList.contains("menu-open")) {
                drawerGroups.forEach(function (group) {
                    setDrawerGroup(group, drawerDefault(group), true);
                });
            }
        }).observe(document.body,
            { attributes: true, attributeFilter: ["class"] });
    }
})();
