const BooksProvider = require("./books")

class ApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.booksProvider = new BooksProvider()
  }

  /**
   * this method allows you to configure your api key for the instance
   * @param {string} apiKey 
  */
  config(apiKey) {
    this.apiKey = apiKey
  }

  /**
   * This method will call the getBooks service
   * @returns 
   */
  async getBooks() {
    return await this.booksProvider.getBooks()
  }

  /**
   * This method will allow the user to filter the books 
   * @param {string} paramType will be the parameter to sort by
   * @param {string} value the value of the parameter to sort by
   * @returns {string} the name of the book or a message
   */
  async getOneBookByParam(paramType, value) {
    if(!paramType||!value){
      return 'Invalid params'
    }
    return await this.booksProvider.getBookByParam(paramType, value)
  }

}

module.exports = ApiClient