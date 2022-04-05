const BooksProvider = require("./books")
const MoviesProvider = require("./movies")

class ApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.booksProvider = new BooksProvider()
    this.moviesProvider = new MoviesProvider(apiKey);
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
   * 
   * @returns {string} the name of the book or a message
   */
  async getOneBookByParam(paramType, value) {
    if(!paramType||!value){
      return 'Invalid params'
    }
    const {name} =  await this.booksProvider.getBookByParam(paramType, value)
    return name
  }

  /**
   * This method will provide all chapters from a book 
   * @param {string} paramType 
   * @param {string} paramType will be the parameter to sort by
   * @param {string} value the value of the parameter to sort by
   * 
   * @returns {Array} of the chapters by order
   */
  async getAllChaptersFromABook(paramType, value){
    const requestedBook =  await this.booksProvider.getBookByParam(paramType, value);
    const booksChapters = await this.booksProvider.getBookChapters(requestedBook._id)
    return booksChapters
  }

  async getMovies () {
    return await this.moviesProvider.getMovies()
  }

  async getOneMovieByParam (paramType, value){
    if(!paramType||!value){
      return 'Invalid params'
    }
    const {name} = await this.moviesProvider.getMovieByParam(paramType, value)
    return name
  }

  async getMoviesByCriteria (criteria, score ){
   return await this.moviesProvider.getMoviesByCriteria(criteria, score)


  }

}

module.exports = ApiClient