document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#personajes");

  if (!slider) return;

  const track = slider.querySelector(".products-grid");
  const cards = Array.from(track.querySelectorAll(".product-card"));

  const nextButton = slider.querySelector(".slider-next");

  const prevButton = slider.querySelector(".slider-prev");

  let currentIndex = 0;
  let autoSlide;

  // =================================
  // TARJETAS VISIBLES
  // =================================

  function getVisibleCards() {
    // Celular
    if (window.innerWidth <= 600) {
      return 2;
    }

    // Tablet y PC
    return 3;
  }

  // =================================
  // DISTANCIA DE MOVIMIENTO
  // =================================

  function getStep() {
    if (!cards.length) return 0;

    const cardWidth = cards[0].getBoundingClientRect().width;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    return cardWidth + gap;
  }

  // =================================
  // MOVER SLIDER
  // =================================

  function moveSlider(animate = true) {
    track.style.transition = animate ? "transform 0.7s ease" : "none";

    track.style.transform = `translateX(-${currentIndex * getStep()}px)`;
  }

  // =================================
  // SIGUIENTE
  // =================================

  function nextSlide() {
    const visibleCards = getVisibleCards();

    currentIndex++;

    /*
      Cuando llegamos al último
      grupo disponible, regresamos
      al primero.
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

  // =================================
  // ANTERIOR
  // =================================

  function previousSlide() {
    const visibleCards = getVisibleCards();

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = cards.length - visibleCards;
    }

    moveSlider(true);
  }

  // =================================
  // BOTÓN SIGUIENTE
  // =================================

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      nextSlide();

      restartAutoSlide();
    });
  }

  // =================================
  // BOTÓN ANTERIOR
  // =================================

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      previousSlide();

      restartAutoSlide();
    });
  }

  // =================================
  // SLIDER AUTOMÁTICO
  // =================================

  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();

    startAutoSlide();
  }

  // =================================
  // PAUSAR CON EL MOUSE
  // =================================

  slider.addEventListener("mouseenter", stopAutoSlide);

  slider.addEventListener("mouseleave", startAutoSlide);

  // =================================
  // RESPONSIVE
  // =================================

  window.addEventListener("resize", () => {
    currentIndex = 0;

    moveSlider(false);
  });

  // =================================
  // INICIAR
  // =================================

  moveSlider(false);

  startAutoSlide();
});
