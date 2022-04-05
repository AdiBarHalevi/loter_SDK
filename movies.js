const axios = require('axios');
const { MOVIES_SEARCH_PARAMS_ENUM, BASE_URL, NUMBER_OF_BOOKS } = require('./constants');

class MoviesProvider {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.movies = []
  }

  /**
   * @private method , will fetch and save the books data on the class.
  */
  async #fetchMovies() {
    try {
      const response = await axios.get(`${BASE_URL}/movie`, { headers: { Authorization: `Bearer ${this.apiKey}` } });
      this.movies = [...response.data.docs];

    } catch (error) {
      console.log(`[ERROR] Failed to fetch movies ${error.message} @ #fetchMovies`);
      throw new Error('failed to fetch movies')
    }
  }

  async getMovies() {
    try {
      if (this.movies.length === 0) {
        await this.#fetchMovies()
      }
      return this.movies.map(movie => movie.name);

    } catch (error) {
      return error.message
    }
  }

  async getMovieByParam (searchParam, value) {
    try {
      if (!MOVIES_SEARCH_PARAMS_ENUM[searchParam] || !value) {
        throw new Error(`
        Invalid parameter to search by,
        please provide one of these: ${Object.keys(MOVIES_SEARCH_PARAMS_ENUM)}
        and a value
        `);
      }
      if (this.movies.length === 0) {
        await this.#fetchMovies();
      }

      if (searchParam !== MOVIES_SEARCH_PARAMS_ENUM.name && value <= 0) {
        throw new Error('invalid value')
      }

      const searchParameter = MOVIES_SEARCH_PARAMS_ENUM[searchParam];
      const requestedMovie = this.movies.find(movie => movie[searchParameter] === value);

      if (!requestedMovie) {
        throw new Error('Book was not found ,invalid search');
      }

      return requestedMovie;

    } catch (error) {
      return error.message;
    }
  }

  async getMoviesByCriteria(criteria,score){
    const response = await axios.get(`${BASE_URL}/movie?${criteria}${score}`, { headers: { Authorization: `Bearer ${this.apiKey}` } });
    return response.data.docs
  }

}

module.exports = MoviesProvider