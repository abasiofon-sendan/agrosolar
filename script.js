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

