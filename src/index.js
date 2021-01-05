import './css/styles.css';

// NOTIFYCATION
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core';

// LODASH
import { debounce } from 'debounce';

// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// TEMPLATE
import templateList from './template/list.hbs';
import templateCard from './template/card.hbs';

// REFERENCES
import getRefs from './referencesHTML.js';
import CountriesServer from './fetchCountries.js';

const refs = getRefs();
const API = new CountriesServer();

refs.input.addEventListener('input', debounce(onSearch, 500));
let query = '';

function onSearch(e) {
  e.preventDefault();
  query = '';
  query = e.target.value;

  if (!query) {
    return clearRenderList();
  }
  API.fetchCountries(query).then(render).catch(onHandleError);
}

function render(itemList) {
  if (itemList.length === 0 || itemList.length > 10) {
    clearRenderList();
    info({
      text: 'Че такой скупой на буквы',
      delay: 2000,
    });
  } else if (itemList.length > 1 && itemList.length <= 10) {
    refs.countryCard.innerHTML = '';
    refs.countryList.innerHTML = templateList(itemList);
  } else if (itemList.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryCard.innerHTML = templateCard(itemList[0]);
  } else {
    refs.countryList.innerHTML = '';
    error({
      text: 'Угомони свою фантазию',
      delay: 2000,
    });
  }
}

function clearRenderList() {
  refs.countryList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

function onHandleError(error) {
  console.log(error);
}
