const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const slideCount = slides.length;
let currentIndex = 0;

function moveToSlide(index) {
  const amountToMove = -index * 100;
  track.style.transform = `translateX(${amountToMove}%)`;
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % slideCount;
  moveToSlide(currentIndex);
}

setInterval(autoSlide, 3000); // Change slide every 3 seconds
