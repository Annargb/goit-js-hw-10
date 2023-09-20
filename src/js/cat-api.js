import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_it6LgSltFVxx1lNXc9zSDn8sZAfihs5hak57XJXZIYJkKEcqFeCHUtGFjGDdaBMT';

function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': axios.defaults.headers.common['x-api-key'],
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': axios.defaults.headers.common['x-api-key'],
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
