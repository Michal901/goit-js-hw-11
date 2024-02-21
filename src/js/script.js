// Importowanie wymaganych modułów
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Deklaracja zmiennych globalnych
const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const searchBtn = document.querySelector('.search-btn');

let currentPage = 1;
let itemsPerPage = 40;

let lightbox = null;

// Funkcja pobierająca dane z serwera Pixabay
async function fetchData(page = 1) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=39663593-8d04c2e8107bf32f11cf1c5f8&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${itemsPerPage}&page=${page}`
    );
    const { hits, total } = response.data;

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadBtn.style.display = 'none';
      return;
    }

    // Tworzenie markupu dla każdego zdjęcia
    const markupArray = hits.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                 <a href="${largeImageURL}">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                  <p class="info-item"><b>Likes: ${likes}</b></p>
                  <p class="info-item"><b>Views: ${views}</b></p>
                  <p class="info-item"><b>Comments: ${comments}</b></p>
                  <p class="info-item"><b>Downloads: ${downloads}</b></p>
                </div>
              </div>`;
      }
    );

    // Sprawdzanie czy pobrano wszystkie dostępne wyniki
    const checkEndOfResults = () => {
      if (hits.length < itemsPerPage && hits.length > 0) {
        loadBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    };
    checkEndOfResults();

    // Dodawanie markupu do galerii
    gallery.insertAdjacentHTML('beforeend', markupArray.join(''));

    // Inicjalizacja lightboxa
    initializeLightbox();
  } catch (error) {
    // Obsługa błędów
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadBtn.style.display = 'none';
  }
}

// Funkcja do ładowania kolejnych wyników
const loadMore = () => {
  currentPage++;
  fetchData(currentPage);
};

// Funkcja zapobiegająca wyszukiwaniu pustego zapytania
const preventEmptyLoading = () => {
  if (input.value.trim() !== '') {
    loadBtn.style.display = 'block';
    fetchData();
  } else {
    Notiflix.Notify.failure('Please enter a search query.');
  }
};

// Inicjalizacja lightboxa
const initializeLightbox = () => {
  const galleryContainer = document.querySelector('.gallery');
  if (galleryContainer && !lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { refresh: true });
  }
};

// Nasłuchiwanie na kliknięcie w galerię
gallery.addEventListener('click', e => {
  e.preventDefault();
  initializeLightbox();
});

// Nasłuchiwanie na kliknięcie w przycisk "Load More"
loadBtn.addEventListener('click', e => {
  e.preventDefault();
  loadMore();
});

// Nasłuchiwanie na kliknięcie w przycisk "Search"
searchBtn.addEventListener('click', e => {
  e.preventDefault();
  preventEmptyLoading();
  currentPage = 1;
  gallery.innerHTML = '';
});
