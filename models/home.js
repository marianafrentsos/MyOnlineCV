let bMenu = document.querySelector(".Bmenu");
let navLink = document.querySelectorAll(".nav-link");
let navItem = document.querySelectorAll(".nav-item");
let burgerMenu = document.querySelector(".navbar-toggler");
let allSections = document.querySelectorAll("body section");

//parallax for the landing page
function parallax(element, distance, speed) {
  const item = document.querySelector(element);
  item.style.transform = `translateX(${distance * 10 * speed}px)`;
}

//parallax for moving up
const parallaxY = (element, distance, speed) => {
  const item = document.querySelector(element);
  item.style.transform = `translateY(${-distance * speed}px)`;
};

//parallax for moving down
const parallaxDown = (element, distance, speed) => {
  const item = document.querySelector(element);
  item.style.transform = `translateY(${(distance / 5) * speed}px)`;
};

window.addEventListener("scroll", function() {
  parallax("#layer1", window.scrollY, 0.3);
  parallax("#layer2", window.scrollY, 0.8);
  parallaxDown(".one", window.scrollY, 0.9);
  parallaxY(".four", window.scrollY, 1.8);
  parallaxY(".two", window.scrollY, 0.6);
  parallaxY(".six", window.scrollY, 0.2);
  parallaxY(".seven", window.scrollY, 0.8);
  parallaxDown(".eight", window.scrollY, 0.6);
  parallaxDown(".three", window.scrollY, 0.6);
  parallaxDown(".five", window.scrollY, 0.8);
});

navLink.forEach(link => {
  link.addEventListener("click", () => {
    let currentLink = document.getElementsByClassName("current");
    currentLink[0].classList.remove("current");
    link.classList.add("current");
    fadeClose();
  });
});

// code for burger Menu
burgerMenu.addEventListener("click", () => {
  bMenu.classList.toggle("show");
});

//Find More Modal
const findMoreBtn = document.getElementById("findMoreBtn");
const myModal = document.querySelector(".myModal");
const closeBtnFo = document.getElementById("closeBtnFo");
const underLayer = document.getElementById("exampleModal");

const fadeClose = () => {
  setTimeout(() => {
    underLayer.classList.remove("fadeOut");
    underLayer.classList.toggle("hide");
  }, 300);
  setTimeout(() => {
    myModal.classList.toggle("hide");
    myModal.classList.remove("fadeOut");
  }, 0);
};

closeBtnFo.addEventListener("click", () => {
  fadeClose();
});

findMoreBtn.addEventListener("click", () => {
  underLayer.classList.toggle("hide");
  underLayer.classList.add("fadeOut");
  myModal.classList.toggle("hide");
  myModal.classList.add("fadeOut");
});

underLayer.addEventListener("click", () => {
  fadeClose();
});

//individual projects accordion
const accordionItems = document.querySelectorAll(".indivProject");
const accordionBody = document.querySelectorAll(".collapsible");

accordionItems.forEach(element => {
  let displayContent = element.nextElementSibling;
  element.addEventListener("click", () => {
    displayContent.classList.toggle("hide");
    element.classList.toggle("active");
    element.classList.toggle("open");

    if (displayContent.style.maxHeight) {
      displayContent.style.maxHeight = null;
    } else {
      displayContent.style.maxHeight = displayContent.scrollHeight + "px";
    }
  });
});

//Make progress bar

window.addEventListener("scroll", () => {
  if (window.scrollY >= 1806 && window.scrollY < 1870) {
    progressBarCss = document.querySelector(".myProgressCss");
    progressBarJs = document.querySelector(".myProgressJs");
    progressBarHtml = document.querySelector(".myProgressHtml");
    progressBarReact = document.querySelector(".myProgressReact");
    progressBarBootstrap = document.querySelector(".myProgressBootstrap");
    progressBarNode = document.querySelector(".myProgressNode");

    const fillProgressBar = (progressBar, progress) => {
      let width = 1;
      let myInterval = setInterval(frame, 40);
      function frame() {
        if (width >= progress) {
          clearInterval(myInterval);
        } else {
          width++;
          progressBar.style.width = width + "%";
          progressBar.innerText = width + "%";
        }
      }
    };

    fillProgressBar(progressBarCss, 50);
    fillProgressBar(progressBarJs, 40);
    fillProgressBar(progressBarHtml, 70);
    fillProgressBar(progressBarReact, 30);
    fillProgressBar(progressBarBootstrap, 40);
    fillProgressBar(progressBarNode, 10);
  }
});
