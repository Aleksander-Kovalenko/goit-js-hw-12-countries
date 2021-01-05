const BASE_URL = 'https://restcountries.eu';

export default class CountryService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/rest/v2/name/${searchQuery}`).then(response =>
      response.json(),
    );
  }
}
