let currentIndex = 0;
const totalSlides = document.querySelectorAll(".carousel-item").length;

function showSlide(index) {
  const carousel = document.getElementById("carousel");
  const slideWidth = document.querySelector(".carousel-item").clientWidth;
  const newPosition = -index * slideWidth;
  carousel.style.transform = `translateX(${newPosition}px)`;
  currentIndex = index;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}
