const revealObserver = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible") }) }, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".gallery-item");
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(b => b.classList.remove("active")); btn.classList.add("active");
  const f = btn.dataset.filter;
  items.forEach(item => item.classList.toggle("hide", f !== "all" && item.dataset.category !== f));
}));

const lightbox = document.querySelector(".lightbox"), lbImg = lightbox.querySelector("img"), caption = lightbox.querySelector(".lightbox-caption");
items.forEach(item => item.addEventListener("click", () => {
  lbImg.src = item.querySelector("img").src; lbImg.alt = item.querySelector("img").alt;
  caption.textContent = item.dataset.title + "  ·  " + item.dataset.category;
  lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden", "false");
}));
function closeLightbox() { lightbox.classList.remove("open"); lightbox.setAttribute("aria-hidden", "true"); }
lightbox.querySelector(".close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox() });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox() });

const menu = document.querySelector(".menu"), navLinks = document.querySelector(".nav-links");
menu.addEventListener("click", () => { navLinks.classList.toggle("mobile-open") });
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("mobile-open")));

window.addEventListener("scroll", () => {
  document.querySelectorAll(".nav-links a").forEach(a => {
    const s = document.querySelector(a.getAttribute("href"));
    if (!s) return;
    const r = s.getBoundingClientRect();
    a.classList.toggle("active", r.top <= 150 && r.bottom > 150);
  });
});