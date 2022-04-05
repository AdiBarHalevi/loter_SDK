const axios = require('axios');
const { SEARCH_PARAMS_ENUM, BASE_URL, NUMBER_OF_BOOKS } = require('./constants');

class BooksProvider {

  /**
   * @private method , will fetch and save the books data on the class.
  */
  async #fetchBooks() {
    try {
      console.log('fetching form api ')
      const response = await axios.get(`${BASE_URL}/book`);
      this.booksByOrder = response.data.docs;

    } catch (error) {
      console.log(`[ERROR] Failed to fetch books ${error.message} @ #fetchBooks`);
      throw new Error('failed to fetch books')
    }
  }

  /**
   * this method will provide the books 
   * @returns {Array} of the LOTR books or a message of failure
   */
  async getBooks() {
    try {
      if (!this.booksByOrder) {
        await this.#fetchBooks()
      }
      return this.booksByOrder.map(book => book.name);

    } catch (error) {
      return error.message
    }
  }

  /**
   * This method wil provide the user the requested book
   * @param {string} searchParam one of possible @enum {SEARCH_PARAMS_ENUM}
   * @param {string} value either the name, id or number of the book
   * @returns {string} Either the name of the book or a failure message
   */
  async getBookByParam(searchParam, value) {
    try {
      if (!SEARCH_PARAMS_ENUM[searchParam] || !value) {
        throw new Error(`
        Invalid parameter to search by,
        please provide one of these: ${Object.keys(SEARCH_PARAMS_ENUM)}
        and a value
        `);
      }
      if (!this.booksByOrder) {
        await this.#fetchBooks();
      }

      if (searchParam === SEARCH_PARAMS_ENUM.order) {
        const requestedBook = this.booksByOrder[Number(value) - 1];
        if (!requestedBook && value > NUMBER_OF_BOOKS) {
          throw new Error('Book was not found ,invalid search');
        }
        return requestedBook.name;
      }

      const searchParameter = SEARCH_PARAMS_ENUM[searchParam];
      const requestedBook = this.booksByOrder.find(book => book[searchParameter] === value);

      if (!requestedBook) {
        throw new Error('Book was not found ,invalid search');
      }

      return requestedBook.name;

    } catch (error) {
      return error.message;
    }

  }
}

module.exports = BooksProvider