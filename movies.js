const axios = require('axios');
const { BASE_URL } = require('./constants');
const Provider = require('./Provider');

class MoviesProvider extends Provider {

  /**
  //  * Will find all the movies that answer the provided criteria 
   * @param {string} criteria 
   * @param {number||string} score 
   * @returns {Array} of movies
   */
  async getMoviesByCriteria(criteria, score) {
    try {
      const response = await axios.get(`${BASE_URL}/movie?${criteria}${score}`, { headers: { Authorization: `Bearer ${this.apiKey}` } });
      return response.data.docs

    } catch (err) {
      throw new Error('Failed to fetch a movie by criteria')
    }
  }
}


module.exports = MoviesProvider