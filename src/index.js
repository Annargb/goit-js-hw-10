// import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const selectEl = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.add('utilites-js');
error.classList.add('utilites-js');

fetchBreeds()
  .then(cats => renderSelectOption(cats))
  .catch(errorSystem => {
    loader.classList.add('utilites-js');
    error.classList.remove('utilites-js');
    console.log(errorSystem);
  });

function renderSelectOption(cats) {
  const markup = cats
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  selectEl.insertAdjacentHTML('beforeend', markup);
}

function renderCatContainer(cat) {
  catContainer.classList.remove('utilites-js');

  const markup = cat
    .map(
      ({
        breeds,
        url,
      }) => `<img src="${url}" alt="cat" class="cat-img" width="300">
      <div class="cat-text-container">
       <h1 class="cat-title">${breeds[0].name}</h1>
       <p class="cat-text">${breeds[0].description}</p>
       <p class="cat-temperament"><span class="accent">Temperament:</span> ${breeds[0].temperament}.</p>
       </div>
     `
    )
    .join('');

  catContainer.innerHTML = markup;
  loader.classList.add('utilites-js');
}

selectEl.addEventListener('change', onSelectChange);

function onSelectChange(event) {
  loader.classList.remove('utilites-js');
  catContainer.classList.add('utilites-js');
  error.classList.add('utilites-js');

  const id = event.target.value;

  fetchCatByBreed(id)
    .then(cat => renderCatContainer(cat))
    .catch(errorSystem => {
      loader.classList.add('utilites-js');
      error.classList.remove('utilites-js');
      console.log(errorSystem);
    });
}
