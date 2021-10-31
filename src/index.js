import './sass/main';

// HANDLEBARS
const Handlebars = require('handlebars');

// LODASH
var debounce = require('lodash.debounce');

// TEMPLATE
import card from './template/cards.hbs';
import itemList from './template/item-list.hbs';

// NOTIFYCATION
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { alert, notice, info, success, error } = require('@pnotify/core');

// REFERENCES
import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';

const refs = getRefs();
refs.inputForm.addEventListener('input', debounce(onSearchCountry, 500));

function onSearchCountry(e) {
  e.preventDefault();
  const value = e.target.value;

  API.fetchCountries(value).then(listCountry).catch(onError);
}

function paintCard(country) {
  const template = card({ country });
  document.querySelector('.js-box-card').insertAdjacentHTML('beforeend', template);
}

function listCountry(list) {
  clearList();
  if (list.status) onError();
  else if (list.length > 10) onInfo();
  else if (list.length === 1) paintCard(list);
  else if (list.length) creatList(list);
}

function clearList() {
  document.querySelector('.js-box-card').innerHTML = ' ';
  document.querySelector('.js-country').innerHTML = ' ';
}

function onError() {
  return error({
    text: 'Sorry',
    delay: 1500,
  });
}

function onInfo() {
  return alert({
    text: "I'm an alert.",
    type: 'info',
    delay: 1500,
  });
}

function creatList(list) {
  document.querySelector('.js-country').insertAdjacentHTML('beforeend', itemList({ list }));
}

function onError(error) {
  console.log(error);
}
