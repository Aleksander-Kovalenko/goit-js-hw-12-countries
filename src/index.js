const Handlebars = require('handlebars');
import './sass/main';
import card from './template/cards.hbs';

const BASE_API = 'https://restcountries.com/v2/name/';

function fetchCountry(name) {
  return fetch(`${BASE_API}${name}`)
    .then(response => response.json())
    .then(paintCard);
}

function paintCard(country) {
  const template = card({ country });

  document.body.insertAdjacentHTML('beforeend', template);
}

fetchCountry('Switzerland');
