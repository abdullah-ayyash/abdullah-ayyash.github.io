// =====================
// Mobile menu functionality
// =====================
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

// =====================
// Contact form functionality (Formspree AJAX)
// =====================
const form = document.querySelector(".contact-form");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Show success message
      successMessage.style.display = "block";

      // Reset form fields
      form.reset();

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth" });

      // Hide message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  } catch (error) {
    alert("Network error. Please try again.");
  }
});

// Handle Enter key for form submission (except in textarea)
form.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
    form.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }
});

// =====================
// Header scroll effect
// =====================
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

// =====================
// Add random delays to floating shapes
// =====================
document.querySelectorAll(".shape").forEach((shape) => {
  shape.style.animationDelay = Math.random() * 20 + "s";
  shape.style.animationDuration = 15 + Math.random() * 10 + "s";
});

// =====================
// Input focus effects
// =====================
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", () => {
    input.parentElement.style.transform = "scale(1)";
  });
});
