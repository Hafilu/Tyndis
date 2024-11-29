 
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".sts-number");
  const observerOptions = {
    root: null, // Use viewport as root
    threshold: 0.5, // Trigger when 50% of the element is visible
  };

  const countUp = (element, start, end, duration) => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const endValue = parseInt(
          counter.textContent.replace(/[^\d]/g, ""),
          10
        );
        countUp(counter, 0, endValue, 4000); // Start, End, Duration (ms)
        observer.unobserve(counter); // Stop observing after animation
      }
    });
  };

  const observer = new IntersectionObserver(callback, observerOptions);
  counters.forEach((counter) => observer.observe(counter));
});
 