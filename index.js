// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  const icon = mobileMenuBtn.querySelector("i");

  if (mobileMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking on a link
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Typing animation for name
const myName = document.getElementById("my-name");
const nameList = [
  "A",
  "b",
  "d",
  "u",
  "l",
  "l",
  "a",
  "h",
  " ",
  "A",
  "y",
  "y",
  "a",
  "s",
  "h",
];

let timeId = setInterval(frame, 200);
let index = 0;

function frame() {
  if (index < nameList.length) {
    myName.textContent += nameList[index];
    index++;
  }

  if (index === nameList.length) {
    clearInterval(timeId);
    // Removes the typing cursor class when animation is complete
    myName.classList.remove("typing-cursor");
  }
}

// Header scroll effect
let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScrollY = window.scrollY;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function generateFloatingShapes() {
  const container = document.querySelector(".floating-shapes");
  const numShapes = 40;

  for (let i = 0; i < numShapes; i++) {
    const size = Math.floor(Math.random() * 10) + 2; // 2px–12px
    const left = Math.random() * 100; // % across the screen
    const top = Math.random() * 100;
    const delay = Math.random() * 10; // 0–10s

    const div = document.createElement("div");
    div.className = "shape";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.left = `${left}%`;
    div.style.top = `${top}%`;
    div.style.animationDelay = `${delay}s`;
    div.style.animationDuration = `${15 + Math.random() * 10}s`;

    container.appendChild(div);
  }
}

generateFloatingShapes();
