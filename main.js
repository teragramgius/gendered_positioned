import { data } from "./data.js";

const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close-btn");

const tl = gsap.timeline({ paused: true, overwrite: "auto" });
tl.to(overlay, {
  duration: 0.5,
  bottom: "0px",
  rotation: 0,
  transformOrigin: "bottom center",
  ease: "power2.out",
});
const items = document.querySelectorAll(".item");
items.forEach((item, index) => {
  item.addEventListener("click", () => {
    tl.play();

    updateOverlay(data[index]);
  });
});

closeBtn.addEventListener("click", () => {
  tl.reverse();
});

function updateOverlay(dataItem) {
  const itemName =
    document.querySelector("#item-category").previousElementSibling;
  const itemCategory = document.querySelector("#item-category");
  const itemLink = document.querySelector("#item-link");
  const itemCopy = document.querySelector("#item-copy");
  const itemImg = document.querySelector("#item-img");

  itemName.textContent = dataItem.itemName;
  itemCategory.textContent = dataItem.itemCategory;
  itemLink.href = dataItem.itemLink;
  itemCopy.textContent = dataItem.itemCopy;
  itemImg.src = dataItem.itemImg;
}

document.addEventListener("click", (e) => {
  if (!overlay.contains(e.target) && !isItem(e.target)) {
    tl.reverse();
  }
});

function isItem(target) {
  return target.closest(".item");
}


const colorThemes = document.querySelectorAll('[name="theme"]');

// store theme
const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

// set theme when visitor returns
const setTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for no :has() support
  document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    // fallback for no :has() support
    document.documentElement.className = themeOption.id;
  });
});

document.onload = setTheme();
