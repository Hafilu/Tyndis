const hamburger = document.getElementById("hamburger");
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("backdrop");
const closeElement = document.getElementById("close");

// Open Drawer
hamburger.addEventListener("click", () => {
  drawer.classList.add("open");
  backdrop.classList.add("open");
});

// Close Drawer on Backdrop Click
backdrop.addEventListener("click", () => {
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
});

// Close Drawer on Backdrop Click
closeElement.addEventListener("click", () => {
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
});
// Data
const heroData = [
  {
    text1: "Tyndis Experiences",
    text2: "100+ exclusive local experiences and Storytelling Tours",
  },
  {
    text1: "Tyndis Experiences",
    text2: "100+ exclusive local experiences and Storytelling Tours",
  },
  {
    text1: "Tyndis Experiences",
    text2: "100+ exclusive local experiences and Storytelling Tours",
  },
];

const videoSrc = "./Assets/video1.mp4"; // Video file
const imageSrcs = [
  "./Assets/banner.jpeg",
  "./Assets/banner.jpeg",
  "./Assets/banner.jpeg",
]; // Image files

// State variables
let heroCount = 0;
let playStatus = false;
let interval = null;

// DOM Elements
const background = document.getElementById("background");
const heroText1 = document.getElementById("heroText1");
const heroText2 = document.getElementById("heroText2");
const dots = document.querySelectorAll(".dot");
const playPauseBtn = document.getElementById("playPauseBtn");

// Update Background
function updateBackground() {
  background.innerHTML = ""; // Clear existing content

  if (!playStatus) {
    // Show the video
    const video = document.createElement("video");
    video.src = videoSrc;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.className = "fade-in";
    video.controls = false; // Adds the controls attribute
    video.playsInline = true; // Adds playsinline
    background.appendChild(video);
    stopInterval(); // Stop the interval when the video is playing
  } else {
    // Show the images
    const img = document.createElement("img");
    img.src = imageSrcs[heroCount];
    img.alt = `Background ${heroCount + 1}`;
    img.className = "fade-in";
    background.appendChild(img);
    startInterval(); // Start the interval when displaying images
  }
}

// Update Hero
function updateHero() {
  heroText1.textContent = heroData[heroCount].text1;
  heroText2.textContent = heroData[heroCount].text2;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === heroCount);
  });
}

// Start Slideshow for Images
function startInterval() {
  if (interval) clearInterval(interval); // Clear any existing interval
  interval = setInterval(() => {
    heroCount = (heroCount + 1) % heroData.length;
    updateBackground();
    updateHero();
  }, 3000);
}

// Stop Slideshow
function stopInterval() {
  if (interval) clearInterval(interval);
}

// Dot Click Handler
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    heroCount = parseInt(dot.getAttribute("data-index"), 10);
    updateBackground();
    updateHero();
  });
});

// Play/Pause Handler
playPauseBtn.addEventListener("click", () => {
  playStatus = !playStatus;
  playPauseBtn.src = playStatus
    ? "./Assets/play_icon.png"
    : "./Assets/pause_icon.png";
  updateBackground();
});

// Initial Render
updateBackground();
updateHero();

// JavaScript for scroll effect
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Adjust scroll threshold as needed
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const imageItems = document.querySelectorAll(".package-image-item");

//   // Check if the user is on mobile
//   const isMobile = window.matchMedia("(max-width: 767px)").matches;

//   if (isMobile) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("in-view");
//           } else {
//             entry.target.classList.remove("in-view");
//           }
//         });
//       },
//       {
//         threshold: 0.9, // Adjust visibility threshold as needed
//       }
//     );

//     imageItems.forEach((item) => observer.observe(item));
//   }
// });

// let debounceTimeout;
// const cards = document.querySelectorAll(".package-image-item");

// const isMobile = window.matchMedia("(max-width: 767px)").matches;
// if (isMobile) {
// const debounceScroll = () => {
//   clearTimeout(debounceTimeout);
//   debounceTimeout = setTimeout(() => {
//     checkVisibility();
//   }, 50); // Delay to debounce the scroll events
// };

// const checkVisibility = () => {
//   cards.forEach((card) => {
//     const rect = card.getBoundingClientRect();
//     const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.6;

//     if (isVisible) {
//       card.classList.add('in-view');
//     } else {
//       card.classList.remove('in-view');
//     }
//   });
// };

// window.addEventListener('scroll', debounceScroll);
// }

let throttleTimeout;
const cards = document.querySelectorAll(".package-image-item");

const isMobile = window.matchMedia("(max-width: 767px)").matches;
if (isMobile) {
  const throttleScroll = () => {
    if (throttleTimeout) return;

    throttleTimeout = setTimeout(() => {
      checkVisibility();
      throttleTimeout = null;
    }, 100); // Delay to throttle the scroll events
  };

  const checkVisibility = () => {
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.5; // 90% of the card visible

      if (isVisible) {
        card.classList.add("in-view");
      } else {
        card.classList.remove("in-view");
      }
    });
  };

  window.addEventListener("scroll", throttleScroll);
}
