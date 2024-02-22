let lightbox = null;

// Inicjalizacja lightboxa
export const initializeLightbox = () => {
  const galleryContainer = document.querySelector('.gallery');
  if (galleryContainer && !lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  }
};
// Funkcja odświeżania lightboxa
export const refreshLightbox = () => {
  if (lightbox) {
    lightbox.refresh();
  }
};
