// активировать номер на мобильных

function addRefToTel() {
  if (window.innerWidth <= 768) {
    Array.from(document.querySelectorAll(".telephone")).forEach((tel) => {
      tel.setAttribute("href", "tel:+77956784567");
    });
  }
}



addRefToTel();

window.addEventListener("resize", addRefToTel);

document.addEventListener("DOMContentLoaded", () => {
  // карусель навеерху

  const direction_carousel = new Splide(".direction__slider", {
    perPage: 1,
    perMove: 1,
    arrows: false,
    pagination: false,
    autoplay: true,
  }).mount();

  // карусель со специалистами

  const persons_carousel = new Splide(".persons__flex", {
    perPage: 4,
    perMove: 1,
    arrows: false,
    pagination: false,
    
    breakpoints: {
      1330: {
        perPage: 3,
      },
      1024: {
        perPage: 2,
      },
      786: {
        perPage: 1,
        arrows: true
      },
    },
  }).mount();
});

// убирать тоасты при ховере на услуги

document.querySelector(".services__open").onmouseover = function () {
  document.querySelector(".toast_first").classList.remove("toast_visible");
};

// гамбургер меню
document.querySelector(".hamburger").addEventListener("click", function () {
  document
    .querySelector(".btn__hamb--triangle-inverce")
    .classList.toggle("hamb_open");
  document
    .querySelector(".header__overlay")
    .classList.toggle("header__overlay_open");
  document.querySelector(".hamburger").classList.toggle("hamburger_open");
  document.querySelector(".header__menu").classList.toggle("menu_open");
});

// тоаст с номером и местоположением
let toast_first = document.querySelector(".toast_first");

Array.from(document.querySelectorAll(".toast_first_open")).forEach((toast) => {
  toast.addEventListener("click", function () {
    toast_first.classList.add("toast_visible");
    if (toast.dataset.img == "true") {
      toast_first.querySelector(".toast_first__img").style["display"] = "block";
    } else {
      toast_first.querySelector(".toast_first__img").style["display"] = "none";
    }
    toast_first.querySelector(
      ".toast_first__text"
    ).innerHTML = `<a href="${toast.dataset.href}">${toast.dataset.text}</a>`;
  });
});
document
  .querySelector(".toast_first__close")
  .addEventListener("click", function () {
    toast_first.classList.remove("toast_visible");
  });

// маска для номера
let number_input = document.querySelector("#number");

function mask(event) {
  event.keyCode && (keyCode = event.keyCode);
  let pos = this.selectionStart;
  if (pos < 3) event.preventDefault();
  let matrix = "+7 (___) ___-__-__",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, ""),
    newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
  i = newValue.indexOf("_");
  if (i != -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }
  let reg = matrix
    .substr(0, this.value.length)
    .replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (
    !reg.test(this.value) ||
    this.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  )
    this.value = newValue;
  if (event.type == "blur" && this.value.length < 5) this.value = "";
}

number_input.addEventListener("input", mask, false);
number_input.addEventListener("focus", mask, false);
number_input.addEventListener("blur", mask, false);
number_input.addEventListener("keydown", mask, false);

// модальное окно с акцией

if (!sessionStorage.getItem("first")) {
  sessionStorage.setItem("first", "true");
}

if (sessionStorage.getItem("first") == "true") {
  setTimeout(() => {
    $.fancybox.open({
      src: "#modal__action",
      type: "inline",
    });
    sessionStorage.setItem("first", "false");
  }, 10000);
}
