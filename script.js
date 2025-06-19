document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar Toggle for Mobile ---
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    // Burger Animation
    burger.classList.toggle("toggle");
  });

  // Close nav when a link is clicked (for single-page navigation)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
      navLinks.forEach((l) => (l.style.animation = "")); // Reset animation
    });
  });

  // --- Testimonial Slider ---
  const slider = document.querySelector(".testimonial-slider");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  const showSlide = (index) => {
    const slideWidth =
      slider.querySelector(".testimonial-card").clientWidth + 30; // Card width + margin
    slider.style.transform = `translateX(${-index * slideWidth}px)`;

    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === index) {
        dot.classList.add("active");
      }
    });
    currentSlide = index;
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideIndex = parseInt(e.target.dataset.slide);
      showSlide(slideIndex);
    });
  });

  // Optional: Auto-slide
  let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % dots.length;
    showSlide(currentSlide);
  }, 5000); // Ganti slide setiap 5 detik

  // Pause auto-slide on hover
  slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  slider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % dots.length;
      showSlide(currentSlide);
    }, 5000);
  });

  // Initialize first slide
  showSlide(0);

  // Update slider on window resize (important for responsiveness)
  window.addEventListener("resize", () => {
    showSlide(currentSlide); // Recalculate position based on new width
  });
});
