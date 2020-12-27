import './css/common.css';

import { debounce } from 'debounce';

import countryContainer from './template/country-list.hbs';
import countryCard from './template/countries-card.hbs';

import getRefs from './get-refs.js';

import API from './fetchCountries.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', onSearchCountry);

function onSearchCountry(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget;
  let nameCountry = searchQuery.query.value;
  const onQueryApa = API.getFetch(nameCountry).then(render).catch(onFetchError);
}

function render(searchQuery) {
  const card = countryCard(searchQuery[0]);

  if (searchQuery.length > 1) {
    const limitList = searchQuery.slice(10);
    createCountriesList(limitList);
  } else {
    refs.countryCard.insertAdjacentHTML('beforeend', card);
  }
}

function createCountriesList(itemList) {
  refs.listCountry.insertAdjacentHTML('beforeend', countryContainer(itemList));
}

function onFetchError(error) {
  alert('Упс, промахнулись');
}
