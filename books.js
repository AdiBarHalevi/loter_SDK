const axios = require('axios');
const { BOOKS_SEARCH_PARAMS_ENUM, BASE_URL, NUMBER_OF_BOOKS } = require('./constants');

class BooksProvider {
  constructor(){
    this.booksByOrder = [];
    this.chapterList = {};
  }
  /**
   * @private method , will fetch and save the books data on the class.
  */
  async #fetchBooks() {
    try {
      const response = await axios.get(`${BASE_URL}/book`);
      this.booksByOrder = [...response.data.docs];

    } catch (error) {
      console.log(`[ERROR] Failed to fetch books ${error.message} @ #fetchBooks`);
      throw new Error('failed to fetch books')
    }
  }

  async #fetchChapters (bookId){

    if(this.chapterList[bookId]){
      return
    }
      const response = await axios.get(`${BASE_URL}/book/${bookId}/chapter`);
      this.chapterList[bookId] =  response.data.docs
  }

  /**
   * this method will provide the books 
   * @returns {Array} of the LOTR books or a message of failure
   */
  async getBooks() {
    try {
      if (this.booksByOrder.length ===0) {
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
  async getBookByParam (searchParam, value) {
    try {
      if (!BOOKS_SEARCH_PARAMS_ENUM[searchParam] || !value) {
        throw new Error(`
        Invalid parameter to search by,
        please provide one of these: ${Object.keys(BOOKS_SEARCH_PARAMS_ENUM)}
        and a value
        `);
      }
      if (this.booksByOrder.length === 0) {
        await this.#fetchBooks();
      }

      if (searchParam === BOOKS_SEARCH_PARAMS_ENUM.order) {
        const requestedBook = this.booksByOrder[Number(value) - 1];
        if (!requestedBook && value > NUMBER_OF_BOOKS) {
          throw new Error('Book was not found ,invalid search');
        }
        return requestedBook;
      }

      const searchParameter = BOOKS_SEARCH_PARAMS_ENUM[searchParam];
      const requestedBook = this.booksByOrder.find(book => book[searchParameter] === value);

      if (!requestedBook) {
        throw new Error('Book was not found ,invalid search');
      }

      return requestedBook;

    } catch (error) {
      return error.message;
    }

  }

  async getBookChapters(bookId){
    try{
      if(!bookId){
        throw new Error('Invalid book for chapter search');
      }
      await this.#fetchChapters(bookId);
      return this.chapterList[bookId].map(chapter => chapter.chapterName)
  
    }catch(err){
      return err.message
    }
    
  }
}

module.exports = BooksProvider