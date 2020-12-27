import './css/common.css';

import { debounce } from 'debounce';

import countryContainer from './template/country-list.hbs';
import countryCard from './template/countries-card.hbs';
import getRefs from './get-refs.js';
import API from './fetchCountries.js';

const refs = getRefs();

refs.searchForm.addEventListener('input', searchCountries);

function searchCountries(e) {
  e.preventDefault();

  const target = e.currentTarget;
  const searchQuery = target.elements.query.value;

  debounce(
    API.getFetch(searchQuery).then(renderCountry).catch(onFetchError),
    500,
  );
}

function onListSearchCountry(countriesList) {
  const markup = countryContainer(countriesList);
  refs.listCountry.insertAdjacentHTML('beforeend', markup);
}

function renderCountry(countries) {
  console.log(countries);
  if (countries.length > 1) {
    console.log('call onListSearchCountry');
    onListSearchCountry(countries);
  } else {
    console.log('ELSE');
    const markup = countryCard(countries[0]);
    refs.countryCard.insertAdjacentElement('beforeend', markup);
  }
}

function onFetchError(error) {
  alert('Упс, что-то пошло не так');
}
