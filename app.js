// Smooth scrolling for in-page links
function setupSmoothScroll() {
  const links = document.querySelectorAll("[data-scroll]");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const headerOffset = 70;
      const rect = target.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top - headerOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
}

const overlay = document.getElementById('img-overlay');
const overlayImg = document.getElementById('overlay-img');
const closeBtn = document.getElementById('close-overlay');

document.querySelectorAll('.gallery-photo').forEach(photo => {
  photo.addEventListener('click', () => {
    const bg = window.getComputedStyle(photo).backgroundImage;
    const url = bg.slice(5, -2);
    overlayImg.src = url;
    overlay.style.display = 'flex';
  });
});

// Close button
closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Mobile navigation (small screens)
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link) return;
    toggle.classList.remove("is-open");
    nav.classList.remove("is-open");
  });
}

// Gallery filters for "Munkáim"
function setupGalleryFilters() {
  const filterButtons = document.querySelectorAll(".filter-pill");
  const items = document.querySelectorAll(".gallery-item");

  if (!filterButtons.length || !items.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");

      items.forEach((item) => {
        const category = item.getAttribute("data-category");
        const show = filter === "all" || category === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
}
const showMoreBtn = document.getElementById("showMoreBtn");

showMoreBtn.addEventListener("click", () => {
  document.querySelectorAll(".gallery-item.hidden").forEach(item => {
    item.classList.remove("hidden");
  });

  showMoreBtn.style.display = "none";
});

// Footer year
function setYear() {
  const yearEl = document.querySelector("#year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

function init() {
  setupSmoothScroll();
  setupMobileNav();
  setupGalleryFilters();
  setYear();
}
document.addEventListener("DOMContentLoaded", () => {
  const showMoreBtn = document.getElementById("showMoreBtn");

  showMoreBtn.addEventListener("click", () => {
    document.querySelectorAll(".gallery-item.hidden").forEach(item => {
      item.classList.remove("hidden");
    });

    showMoreBtn.style.display = "none";
  });
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
