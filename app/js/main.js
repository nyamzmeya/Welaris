document.addEventListener("DOMContentLoaded", () => {
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

  // выпадающие услуги

  document.querySelector(".services_open").onmouseover = function () {
    document.querySelector(".services").style.display = "inline-flex";
  };

  document.querySelector(".services_open").onmouseout = function () {
    document.querySelector(".services").style.display = "none";
  };

  // тоаст с номером и местоположением
  let toast_first = document.querySelector(".toast_first");

  Array.from(document.querySelectorAll(".toast_first_open")).forEach(
    (toast) => {
      toast.addEventListener("click", function () {
        toast_first.classList.add("toast_visible");
        if (toast.dataset.img == "true") {
          toast_first.querySelector(".toast_first__img").style["display"] =
            "block";
        } else {
          toast_first.querySelector(".toast_first__img").style["display"] =
            "none";
        }
        toast_first.querySelector(".toast_first__text").innerText =
          toast.dataset.text;
      });
    }
  );
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

  const programs_carousel = new Splide(".programs__carousel", {
    perPage: 1,
    arrows: false,
    pagination: false,
  }).mount();
  Array.from(
    document.querySelector(".programs__buttons").querySelectorAll(".button")
  ).forEach((button) => {
    button.addEventListener("click", function (event) {
      programs_carousel.go(parseInt(event.target.dataset.index) - 1);
    });
  });

  // карусель с этажами

  const info_floors_carousel = new Splide(".info__floors", {
    perPage: 1,
    arrows: false,
    pagination: false,
  }).mount();
  Array.from(
    document.querySelector(".info__floors__buttons").querySelectorAll(".button")
  ).forEach((button) => {
    button.addEventListener("click", function (event) {
      info_floors_carousel.go(parseInt(event.target.dataset.index) - 1);
    });
  });

  // высота для блоков с абсолютныи картинками

  function resizeListenerMethodItem() {
    if (window.innerWidth <= 1440) {
      Array.from(document.querySelectorAll(".methods__img")).forEach((item) => {
        let distance = document.querySelector(".container").offsetLeft;
        if (item.classList.contains("methods__img_right")) {
          item.style["transform"] = `translateX(${distance}px)`;
        } else {
          item.style["transform"] = `translateX(-${distance}px)`;
        }
      });
    }
  }

  resizeListenerMethodItem();

  window.addEventListener("resize", resizeListenerMethodItem);

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

  sessionStorage.setItem("first", true);

  let modal_action = document.querySelector(".modal__action");

  if (sessionStorage.getItem("first")) {
    setTimeout(() => {
      modal_action.classList.add("is-visible");
      sessionStorage.setItem("first", false);
    }, 0);
  }

  let modal__close = document.querySelectorAll(".modal-close");

  Array.from(modal__close).forEach((close) => {
    close.onclick = function () {
      close.closest(".modal").classList.remove("is-visible");
    };
  });

  window.onclick = function (event) {
    if (!event.target.classList.contains("modal-wrapper")) {
      Array.from(document.querySelectorAll(".modal")).forEach((modal) =>modal.classList.remove("is-visible"));
    }
  };
});
