// Set Css Variables

document.querySelector(':root').style.setProperty('--scroll-pos', this.scrollY );
document.querySelector(':root').style.setProperty('--window-height', window.window.innerHeight );

window.onscroll = function() {
    document.querySelector(':root').style.setProperty('--scroll-pos', this.scrollY );
  }
  
  window.onresize = function(){
    document.querySelector(':root').style.setProperty('--window-height', window.window.innerHeight );
  }

// Accessibility font

const body = document.body;
const checkbox = document.getElementById("accessible-font");
const hamburgerCheckbox = document.getElementById("accessible-font-hamburger");

if (localStorage.getItem("accessibleFont") === "true") {
    body.classList.add("accessible-font");
    checkbox.checked = true;
    hamburgerCheckbox.checked = true;
}

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      body.classList.add("accessible-font");
      hamburgerCheckbox.checked = true;
      localStorage.setItem("accessibleFont", "true");
    } else {
      body.classList.remove("accessible-font");
      hamburgerCheckbox.checked = false;
      localStorage.setItem("accessibleFont", "false");
    }
});

hamburgerCheckbox.addEventListener("change", () => {
  if (hamburgerCheckbox.checked) {
    body.classList.add("accessible-font");
    checkbox.checked = true;
    localStorage.setItem("accessibleFont", "true");
  } else {
    body.classList.remove("accessible-font");
    checkbox.checked = false;
    localStorage.setItem("accessibleFont", "false");
  }
});

// Navbar and Hamburger Menu

const hamburger = document.getElementById("hamburger");
const hamburgerMenu = document.getElementById("hamburger-menu");

window.onscroll = function() {
  if (hamburgerMenu.classList.contains("visible")){
    closeHamburgerMenu();
  }
}

window.onresize = function(){
  if (hamburgerMenu.classList.contains("visible")){
    closeHamburgerMenu();
  }
}

hamburger.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("visible");
    if (hamburgerMenu.classList.contains("visible")) {
      animateX();
    } else {
      animateHamburger();
    }
})

function closeHamburgerMenu(){
    hamburgerMenu.classList.remove("visible");
    animateHamburger();
}

const icon = document.querySelector(".hamburger-icon");

function animateHamburger() {
  let frame = 5
  const step = () => {
    if (frame>0) {
      frame--;
      setTimeout(step, 50);
    }
    document.querySelector(':root').style.setProperty('--hamburger-animation', frame );
  }
  step();
}

function animateX() {
  let frame = 0
  const step = () => {
    if (frame<5) {
      frame++;
      setTimeout(step, 50);
    }
    document.querySelector(':root').style.setProperty('--hamburger-animation', frame );
  }
  step();
}

// Epoch timers

const now = new Date();

function EpochYearsAgo(element,timestamp) {
  if (element) {
    element.innerHTML = Math.floor(((now/1000)-timestamp)/3.156e7);
  }
}

EpochYearsAgo(document.getElementById("pixelart-years"),1593424800);
EpochYearsAgo(document.getElementById("allure-years"),1633191780);
EpochYearsAgo(document.getElementById("allure-modern-years"),1640995200);

