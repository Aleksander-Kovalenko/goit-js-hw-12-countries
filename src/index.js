import './sass/main.scss';

fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(console.log);
