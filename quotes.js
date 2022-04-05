const axios = require('axios');
const { BASE_URL } = require('./constants');
const Provider = require('./Provider');

class QuotesProvider extends Provider {

  async getMovieQuotesById(movieId) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/quote`, { headers: { Authorization: `Bearer ${this.apiKey}` } });
      return response.data.docs

    } catch (err) {
      throw new Error('Failed to fetch a movie quotes')
    }
  }
}

module.exports = QuotesProvider