// =========================================================
// Portfolio scripts — small, dependency-free
// =========================================================

(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = nav.querySelectorAll("a");

  // Header turns solid after scrolling
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const closeMenu = () => {
    menuBtn.classList.remove("open");
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  };
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  });
  navLinks.forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });

  // Fade-in on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Highlight the current section in the menu
  const sections = document.querySelectorAll("main section[id]");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) =>
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
          );
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  // Links that are still empty: dim them and stop them from doing anything.
  // As soon as you paste a URL into href="", they become normal automatically.
  document.querySelectorAll(".link, #githubLink").forEach((a) => {
    const href = (a.getAttribute("href") || "").trim();
    if (!href || href === "#") {
      a.classList.add("pending");
      a.setAttribute("aria-disabled", "true");
      a.addEventListener("click", (e) => e.preventDefault());
    }
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();
})();
