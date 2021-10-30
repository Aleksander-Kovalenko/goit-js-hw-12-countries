const Handlebars = require('handlebars');
var debounce = require('lodash.debounce');
import './sass/main';
import card from './template/cards.hbs';
import itemList from './template/item-list.hbs';

const BASE_API = 'https://restcountries.com/v2/name/';

const refs = {
  submitForm: document.querySelector('.js-button'),
  inputForm: document.querySelector('.js-input'),
};
refs.submitForm.addEventListener('click', e => {
  e.preventDefault();
});

refs.inputForm.addEventListener('input', debounce(fetchCountry, 500));

function fetchCountry(e) {
  e.preventDefault();
  const value = e.target.value;
  console.log(value);
  return fetch(`${BASE_API}${value}`)
    .then(response => response.json())
    .then(listCountry)
    .catch(console.log);
}

function paintCard(country) {
  const num = country.length;
  console.log(num);
  const template = card({ country });

  document.querySelector('.js-box-card').insertAdjacentHTML('beforeend', template);
}

function listCountry(list) {
  document.querySelector('.js-box-card').innerHTML = '';
  document.querySelector('.js-country').innerHTML = '';
  if (list.length === 1) return paintCard(list);
  document.querySelector('.js-country').insertAdjacentHTML('beforeend', itemList({ list }));
}
