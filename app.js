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

function setupLightbox() {
  const overlay = document.getElementById("img-overlay");
  const overlayImg = document.getElementById("overlay-img");
  const closeBtn = document.getElementById("close-overlay");
  const photos = document.querySelectorAll(".gallery-photo");

  if (!overlay || !overlayImg || !closeBtn || !photos.length) return;

  const closeOverlay = () => {
    overlay.style.display = "none";
    overlayImg.src = "";
  };

  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      const bg = window.getComputedStyle(photo).backgroundImage;
      const match = bg.match(/url\(["']?(.+?)["']?\)/);
      const url = match?.[1];
      if (!url) return;

      overlayImg.src = url;
      overlay.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") {
      closeOverlay();
    }
  });
}

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
function setupShowMoreButton() {
  const showMoreBtn = document.getElementById("showMoreBtn");
  if (!showMoreBtn) return;

  showMoreBtn.addEventListener("click", () => {
    document.querySelectorAll(".gallery-item.hidden").forEach((item) => {
      item.classList.remove("hidden");
    });

    showMoreBtn.style.display = "none";
  });
}

function setupContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.querySelector("#name")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const date = form.querySelector("#date")?.value.trim() || "";
    const type = form.querySelector("#type")?.value.trim() || "";
    const message = form.querySelector("#message")?.value.trim() || "";

    if (!name || !email) {
      form.reportValidity();
      return;
    }

    const subject = "Új érdeklődés a dr-photo weboldalról";
    const bodyLines = [
      `Név: ${name}`,
      `Email: ${email}`,
      `Dátum: ${date || "nincs megadva"}`,
      `Típus: ${type || "nincs megadva"}`,
      "",
      "Üzenet:",
      message || "nincs megadva",
    ];

    const mailto = `mailto:doczi.robert@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  });
}

// Footer year
function setYear() {
  const yearEl = document.querySelector("#year");
  if (!yearEl) return;
  yearEl.textContent = new Date().getFullYear();
}

function init() {
  setupSmoothScroll();
  setupLightbox();
  setupMobileNav();
  setupGalleryFilters();
  setupShowMoreButton();
  setupContactForm();
  setYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
