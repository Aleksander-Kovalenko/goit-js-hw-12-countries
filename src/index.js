const Handlebars = require('handlebars');
var debounce = require('lodash.debounce');

const { alert, notice, info, success, error } = require('@pnotify/core');

import './sass/main';
import card from './template/cards.hbs';
import itemList from './template/item-list.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const BASE_API = 'https://restcountries.com/v2/name';

const refs = {
  inputForm: document.querySelector('.js-input'),
};

refs.inputForm.addEventListener('input', debounce(fetchCountry, 500));

function fetchCountry(e) {
  e.preventDefault();
  const value = e.target.value;

  return fetch(`${BASE_API}/${value}`)
    .then(response => response.json())
    .then(listCountry);
}

function paintCard(country) {
  const template = card({ country });
  document.querySelector('.js-box-card').insertAdjacentHTML('beforeend', template);
}

function listCountry(list) {
  clear();
  if (list.status) onError();
  else if (list.length > 10) onInfo();
  else if (list.length === 1) paintCard(list);
  else if (list.length) creatList(list);
}

function clear() {
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
