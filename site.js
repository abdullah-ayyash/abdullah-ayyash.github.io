/* Shared behaviour for every page: menu, header, footer year, fireflies.
   The page content never depends on this file; it only enhances it. */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  // --- Mobile menu ---------------------------------------------------------
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open && header) header.classList.remove("is-hidden");
  }

  if (menu && menuBtn) {
    menuBtn.addEventListener("click", () => {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    window.matchMedia("(min-width: 800px)").addEventListener("change", (e) => {
      if (e.matches) setMenu(false);
    });
  }

  // --- Header: hide while scrolling down, show on the way up ---------------
  if (header) {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const menuOpen = menu && menu.classList.contains("is-open");
      const h = header.offsetHeight;

      if (!menuOpen && y > lastY && y > h * 1.5 && !header.matches(":focus-within")) {
        header.classList.add("is-hidden");
      } else if (y < lastY || y <= h) {
        header.classList.remove("is-hidden");
      }

      lastY = y;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
  }

  // --- Footer year ---------------------------------------------------------
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // --- Fireflies -----------------------------------------------------------
  const container = document.querySelector(".fireflies");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!container || reduceMotion.matches) return;

  const count = window.innerWidth < 700 ? 12 : 24;
  const flies = [];
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const size = 3 + Math.random() * 8; // 3px - 11px
    const el = document.createElement("span");
    el.className = "firefly";
    el.style.width = el.style.height = `${size.toFixed(1)}px`;
    el.style.left = `${(Math.random() * 100).toFixed(1)}%`;
    el.style.top = `${(Math.random() * 100).toFixed(1)}%`;
    const duration = 16 + Math.random() * 10;
    el.style.animationDuration = `${duration.toFixed(1)}s`;
    // Negative delay: each firefly starts mid-cycle, so the page is alive immediately.
    el.style.animationDelay = `-${(Math.random() * duration).toFixed(1)}s`;
    flies.push({ el, p: 0 });
    frag.appendChild(el);
  }
  container.appendChild(frag);

  // Pointer glow: only on devices with a real hover pointer, one rAF per frame.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const RADIUS = 150;
  let pointer = null;
  let queued = false;

  const paint = () => {
    queued = false;
    for (const fly of flies) {
      let p = 0;
      if (pointer) {
        const r = fly.el.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height / 2);
        p = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
      }
      if (Math.abs(p - fly.p) > 0.02) {
        fly.p = p;
        fly.el.style.setProperty("--p", p.toFixed(2));
      }
    }
  };

  const schedule = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(paint);
    }
  };

  document.addEventListener(
    "pointermove",
    (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    },
    { passive: true }
  );

  document.documentElement.addEventListener("mouseleave", () => {
    pointer = null;
    schedule();
  });
})();
