const BooksProvider = require("./books");
const ChapterProvider = require("./chapters");
const CharacterProvider = require("./characters");
const {
  MOVIES_SEARCH_PARAMS_ENUM,
  BOOKS_SEARCH_PARAMS_ENUM,
  QUOTES_SEARCH_PARAMS_ENUM,
  CHAPTERS_SEARCH_PARAMS_ENUM,
  FILTERING_OPTIONS } = require("./constants");
const MoviesProvider = require("./movies");
const QuotesProvider = require("./quotes");

class ApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.booksProvider = new BooksProvider(apiKey, 'book', BOOKS_SEARCH_PARAMS_ENUM, FILTERING_OPTIONS)
    this.moviesProvider = new MoviesProvider(apiKey, 'movie', MOVIES_SEARCH_PARAMS_ENUM);
    this.quotesProvider = new QuotesProvider(apiKey, 'quote', QUOTES_SEARCH_PARAMS_ENUM)
    this.chaptersProvider = new ChapterProvider(apiKey, 'chapter', CHAPTERS_SEARCH_PARAMS_ENUM)
    this.characterProvider = new CharacterProvider(apiKey, 'character', CHAPTERS_SEARCH_PARAMS_ENUM,FILTERING_OPTIONS)
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
  async getBooks(options) {
    try {
      if (options) {
        return await this.booksProvider.fetchBooksWithOptions(options)
      }
      return await this.booksProvider.getAllType('name')

    } catch (err) {
      return err.message
    }

  }

  /**
   * This method will allow the user to filter the books 
   * @param {string} paramType will be the parameter to sort by
   * @param {string} value the value of the parameter to sort by
   * 
   * @returns {string} the name of the book or a message
   */
  async getOneBookByParam(paramType, value) {
    try {
      if (!paramType || !value) {
        return 'Invalid params'
      }

      const { name } = await this.booksProvider.getTypeByParam(paramType, value)
      return name

    } catch (err) {
      return err.message
    }
  }

  /**
   * This method will provide all chapters from a book 
   * @param {string} paramType 
   * @param {string} paramType will be the parameter to sort by
   * @param {string} value the value of the parameter to sort by
   * 
   * @returns {Array} of the chapters by order
   */
  async getAllChaptersFromABook(paramType, value) {
    try {
      const requestedBook = await this.booksProvider.getTypeByParam(paramType, value);
      const booksChapters = await this.booksProvider.getBookChapters(requestedBook._id);
      return booksChapters

    } catch (err) {
      return err.message

    }
  }

  /**
   * This Method will get the LOTER movies 
   * @param {Object} options optional @constant FILTERING_OPTIONS
   * @returns the names of the movies
   */
  async getMovies(options) {
    try {
      if (options) {
        return await this.moviesProvider.fetchBooksWithOptions(options)
      }

      return await this.moviesProvider.getAllType('name');

    } catch (err) {
      return err.message
    }
  }

  /**
   * This method will search for a movie with parameters
   * 
   * @param {string} paramType : id, name , order
   * @param {string} value value to search by
   * @returns the name of the movie that answer that param.
   */
  async getOneMovieByParam(paramType, value) {
    try {
      if (!paramType || !value) {
        return 'Invalid params'
      }
      const { name } = await this.moviesProvider.getTypeByParam(paramType, value);
      return name

    } catch (err) {
      return err.message
    }
  }

  /**
   * This movie will provide the movies that answer the criteria requested 
   * @param {object} criteria @constant MOVIES_SEARCH_PARAMS_ENUM
   * @param {number||string} score to search by criteria 
   * @returns {Array} of objects that describes to movie
   */
  async getMoviesByCriteria(criteria, score) {
    try {
      if(!criteria || !score){
        throw new Error('Invalid criteria or score')
      }
      return await this.moviesProvider.getMoviesByCriteria(criteria, score);

    } catch (err) {
      return err.message
    }
  }

  /**
   * This method fetches movie quotes
   * @param {string} name provides movie quotes 
   * @returns {Array} of Quotes from the movie provided
   */
  async getMoviesQuotes(name) {
    try {
     if(!name) throw new Error('invalid movie name');

      const { _id } = await this.moviesProvider.getTypeByParam('name', name);
      return await this.quotesProvider.getMovieQuotesById(_id);

    } catch (err) {
      return err.message
    }
  }

  /**
   * 
   * @returns {Array} all the quotes from all the movies
   */
  async getAllQuotes() {
    try {
      return await this.quotesProvider.getAllType('dialog');

    } catch (err) {
      return err.message

    }
  }

  /**
   * 
   * @returns {Array} all the chapters in series 
   */
  async getAllChapters() {
    try {
      return await this.chaptersProvider.getAllType('chapterName');

    } catch (err) {
      return err.message

    }
  }

  /**
   * This method provides a book by chapter name
   * @param {string} chapterName 
   * @returns {Array} name of the book
   */
  async getBookByChapterName(chapterName) {
    try {
      if(!chapterName){
        throw new Error('Invalid chapter name')
      }
      const chapter = await this.chaptersProvider.getTypeByParam('chapterName', chapterName);
      return await this.booksProvider.getTypeByParam('id', chapter.book)

    } catch (err) {
      return err.message
    }
  }


  /**
   * 
   * @returns {Array} all the characters
   */
  async getAllCharacters(param) {
    try {
      return await this.characterProvider.getAllType(param);

    } catch (err) {
      return err.message

    }
  }

}

module.exports = ApiClient