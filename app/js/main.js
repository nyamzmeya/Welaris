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

// тоасты с наградами

Array.from(document.querySelectorAll(".toast_second__close")).forEach(
  (toast) => {
    toast.addEventListener("click", function (event) {
      event.target.closest(".toast").remove();
    });
  }
);

// дата заезда и выезда
document.getElementById("end-date").valueAsDate = new Date();
document.getElementById("start-date").valueAsDate = new Date();

// карусель с программами

document.addEventListener("DOMContentLoaded", () => {
  const programs_carousel = new Splide(".programs__carousel", {
    perPage: 1,
    arrows: false,
    pagination: false,
    rewindByDrag: false,
  }).mount();

  Array.from(
    document.querySelector(".programs__buttons").querySelectorAll(".button")
  ).forEach((button) => {
    button.addEventListener("click", function (event) {
      programs_carousel.go(parseInt(event.target.dataset.index) - 1);
    });
  });

  Array.from(document.querySelectorAll(".programs__slide__img")).forEach(
    (slide) => {
      const programs_img_carousel = new Splide(slide, {
        perPage: 1,
        pagination: false,
      }).mount();
    }
  );

  // карусель с этажами

  const info_floors_carousel = new Splide(".info__floors", {
    perPage: 1,
    arrows: false,
    pagination: false,
  }).mount();
  Array.from(
    document.querySelector(".floors__buttons").querySelectorAll(".button")
  ).forEach((button) => {
    button.addEventListener("click", function (event) {
      info_floors_carousel.go(parseInt(event.target.dataset.index) - 1);
    });
  });
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

// кастомный select
let x, i, j, selElmnt, a, b, c;

x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];

  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);

  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.dataset.index = selElmnt.options[j].value;
    c.addEventListener("click", function (e) {
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      h = this.parentNode.previousSibling;
      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    c.addEventListener("click", function (event) {
      info_floors_carousel.go(parseInt(event.target.dataset.index) - 1);
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  let x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

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

let modal__close = document.querySelectorAll(".modal-close");

Array.from(modal__close).forEach((close) => {
  close.onclick = function () {
    close.closest(".modal").classList.remove("is-visible");
  };
});

window.onclick = function (event) {
  if (!event.target.classList.contains("modal-wrapper")) {
    Array.from(document.querySelectorAll(".modal")).forEach((modal) =>
      modal.classList.remove("is-visible")
    );
  }
};
