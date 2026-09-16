document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".products-slider");

  if (!slider) return;

  const track = slider.querySelector(".products-grid");
  const cards = Array.from(track.querySelectorAll(".product-card"));

  const nextButton = slider.querySelector(".slider-next");
  const prevButton = slider.querySelector(".slider-prev");

  let currentIndex = 0;
  let autoSlide;

  function getVisibleCards() {
    if (window.innerWidth <= 600) {
      return 2;
    }

    return 3;
  }

  function getStep() {
    const card = cards[0];

    const cardWidth = card.offsetWidth;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    return cardWidth + gap;
  }

  function moveSlider(animate = true) {
    track.style.transition = animate ? "transform 0.7s ease" : "none";

    track.style.transform = `translateX(-${currentIndex * getStep()}px)`;
  }

  function nextSlide() {
    const visibleCards = getVisibleCards();

    currentIndex++;

    /*
     * Cuando llegamos a la última tarjeta,
     * volvemos suavemente al principio.
     */

    if (currentIndex > cards.length - visibleCards) {
      currentIndex = 0;

      moveSlider(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          moveSlider(true);
        });
      });

      return;
    }

    moveSlider(true);
  }

  function previousSlide() {
    const visibleCards = getVisibleCards();

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = cards.length - visibleCards;
    }

    moveSlider(true);
  }

  /* =================================
     BOTONES
  ================================= */

  nextButton.addEventListener("click", () => {
    nextSlide();

    restartAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    previousSlide();

    restartAutoSlide();
  });

  /* =================================
     AUTOMÁTICO
  ================================= */

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  function restartAutoSlide() {
    stopAutoSlide();

    startAutoSlide();
  }

  /* =================================
     PAUSAR AL PASAR EL MOUSE
  ================================= */

  slider.addEventListener("mouseenter", stopAutoSlide);

  slider.addEventListener("mouseleave", startAutoSlide);

  /* =================================
     RESPONSIVE
  ================================= */

  window.addEventListener("resize", () => {
    currentIndex = 0;

    moveSlider(false);
  });

  /* =================================
     INICIAR
  ================================= */

  moveSlider(false);

  startAutoSlide();
});
