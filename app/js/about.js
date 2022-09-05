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
