import './css/common.css';
import template from './template/countries-card.hbs';
import getRefs from './get-refs.js';
import API from './api-service.js';

const refs = getRefs();

refs.searchForm.addEventListener('submit', searchCountries);

function searchCountries(e) {
  e.preventDefault();

  const target = e.currentTarget;
  const searchQuery = target.elements.query.value;

  API.getFetch(searchQuery)
    .then(renderCountry)
    .catch(onFetchError)
    .finally(() => {
      target.reset();
    });
}

function renderCountry(country) {
  const markup = template(country[0]);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, что-то пошло не так и мы не нашли это Государство');
}
