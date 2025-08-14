document.addEventListener("DOMContentLoaded", () => {
  const animatedItems = document.querySelectorAll(".card, .kpi, .hero-ctas, h2");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedItems.forEach(item => observer.observe(item));
});
