import axios from 'axios';
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

async function fetchData() {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=39663593-8d04c2e8107bf32f11cf1c5f8&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`
    );

    const { hits } = response.data;

    const markupArray = hits.map(
      ({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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

    const gallery = document.querySelector('.gallery');
    gallery.insertAdjacentHTML('beforeend', markupArray.join(''));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
