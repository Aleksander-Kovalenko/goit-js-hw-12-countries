const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function getFetch(searchQuery) {
  return fetch(`${BASE_URL}/${searchQuery}`).then(response => {
    return response.json();
  });
}

export default { getFetch };
