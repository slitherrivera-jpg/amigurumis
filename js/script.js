/* =========================================
   MENU MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

/* =========================================
   CERRAR MENU AL HACER CLICK
========================================= */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

/* =========================================
   NAVBAR AL HACER SCROLL
========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================
   ANIMACIÓN DE PRODUCTOS
========================================= */

const products = document.querySelectorAll(".product-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 120);

        observer.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.15,
  },
);

products.forEach((product) => {
  observer.observe(product);
});

/* =========================================
   WHATSAPP
========================================= */

const whatsappButton = document.getElementById("whatsappButton");

whatsappButton.addEventListener("click", (event) => {
  event.preventDefault();

  /*
       CAMBIA ESTE NÚMERO POR TU NÚMERO
       DE WHATSAPP.

       Formato:
       código del país + número
       Ejemplo Perú:
       519XXXXXXXX
    */

  const phone = "51985617504";

  const message =
    "Hola, estoy interesado en pedir un amigurumi personalizado. Me gustaría recibir más información.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});
const pedidos = document.querySelectorAll(".pedido-whatsapp");

const numeroWhatsApp = "51985617504";

pedidos.forEach((boton) => {
  boton.addEventListener("click", function (e) {
    e.preventDefault();

    const producto = this.dataset.producto;

    const mensaje =
      `Hola, estoy interesado en pedir el ${producto}. ` +
      `Me gustaría recibir más información.`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  });
});
