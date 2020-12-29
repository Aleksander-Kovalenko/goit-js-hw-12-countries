import './css/common.css';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core';

import debounce from 'lodash.debounce';

import countryContainer from './template/country-list.hbs';
import countryCard from './template/countries-card.hbs';

import getRefs from './get-refs.js';
import API from './fetchCountries.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearchCountry, 500));
let searchQuery = '';

function onSearchCountry(e) {
  e.preventDefault();
  searchQuery = '';
  searchQuery = e.target.value;

  if (!searchQuery) {
    refs.cardBox.innerHTML = '';
    return;
  } else {
    API.getFetch(searchQuery).then(render).catch(onFetchError);
  }
}

function render(fetchQuery) {
  if (fetchQuery.length === 0 || fetchQuery.length > 10) {
    error({
      text: 'Уточните свой поиск!',
      delay: 2000,
    });
  } else if (fetchQuery.length >= 2 && fetchQuery.length <= 10) {
    createCountriesList(refs.listCountry, countryContainer, fetchQuery);
  } else if (fetchQuery.length === 1) {
    createCountriesList(refs.countryCard, countryCard, fetchQuery[0]);
  } else {
    refs.listCountry.innerHTML = '';
    info({
      text: 'Не удалось найти',
      delay: 2000,
    });
  }
}

function createCountriesList(getRef, template, query) {
  if (getRef === refs.countryCard) {
    refs.listCountry.innerHTML = '';
  } else {
    refs.countryCard.innerHTML = '';
  }
  getRef.innerHTML = template(query);
  // getRef.insertAdjacentHTML('beforeend', template(query));
}

function onFetchError(error) {
  console.log(error);
}
