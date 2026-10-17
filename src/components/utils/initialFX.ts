import gsap from "gsap";
import { getSmootherInstance } from "./scrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const smoother = getSmootherInstance();
  if (smoother) {
    smoother.paused(false);
  }
  ScrollTrigger.refresh();
  const main = document.getElementsByTagName("main")[0];
  if (main) {
    main.classList.add("main-active");
  }
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Fade in navigation, floating social icons, and nav overlay
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Staggered smooth reveal for hero content column elements
  const heroElements = document.querySelectorAll(
    ".hero-greeting, .hero-name, .hero-role-container, .hero-badges-wrap, .hero-bio, .hero-cta-wrap, .hero-university-card"
  );
  if (heroElements.length > 0) {
    gsap.fromTo(
      heroElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.25,
      }
    );
  }
}
