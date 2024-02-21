import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const searchBtn = document.querySelector('.search-btn');

let currentPage = 1;
let currentPerPage = 40;

async function fetchData(page = 1) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=39663593-8d04c2e8107bf32f11cf1c5f8&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${currentPerPage}&page=${page}`
    );
    const { hits } = response.data;

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
                  <p class="info-item">
                    <b>Likes: ${likes}</b>
                  </p>
                  <p class="info-item">
                    <b>Views: ${views}</b>
                  </p>
                  <p class="info-item">
                    <b>Comments: ${comments}</b>
                  </p>
                  <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                  </p>
                </div>
              </div>`;
      }
    );

    Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);

    const mleko = () => {
      if (response.data.hits.length < currentPerPage) {
        loadBtn.style.display = 'none';
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    };
    mleko();

    console.log(response.data.total);

    gallery.insertAdjacentHTML('beforeend', markupArray.join(''));
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

const loadMore = () => {
  currentPage++;
  fetchData(currentPage);
};

const preventEmptyLoading = () => {
  if (input.value.trim() !== '') {
    fetchData();
  } else {
    Notiflix.Notify.failure('Please enter a search query.');
  }
};

const showLoadButton = () => {
  if (input.value.trim() !== '') {
    loadBtn.style.display = 'block';
  }
};

loadBtn.addEventListener('click', e => {
  e.preventDefault();
  loadMore();
});

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  showLoadButton();
  preventEmptyLoading();
  currentPage = 1;
  gallery.innerHTML = '';
});

document.addEventListener('DOMContentLoaded', function () {
  let lightbox = new SimpleLightbox('.gallery a');
});
