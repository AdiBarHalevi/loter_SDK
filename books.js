const axios = require("axios");
const { BASE_URL } = require("./constants");
const Provider = require("./Provider");

class BooksProvider extends Provider {

  #validateOptions(options) {
    if (!Object.keys(this.apiFilterOption).includes(options.action)) throw new Error('Invalid options')
  }

  #generateSearchURL(options){
    const {action,value,param} = options
    const actionToPerform = this.apiFilterOption[action]
    const optionsString = `?${param}${actionToPerform}${value}`
    return optionsString
  }

  async #fetchChapters(bookId) {
    if (this.providerData[bookId]) {
      return
    }
    const response = await axios.get(`${BASE_URL}/book/${bookId}/chapter`);
    this.providerData[bookId] = response.data.docs;
  }


  async fetchBooksWithOptions(options) {
    try{
      this.#validateOptions(options);
      const optionsString = this.#generateSearchURL(options)

      const response = await axios.get(`${BASE_URL}/book${optionsString}`);
      return response.data.docs.map(book => book.name)


    }catch(err){
      return err.message
    }
  }



  async getBookChapters(bookId) {
    try {
      if (!bookId) {
        throw new Error('Invalid book for chapter search');
      }
      await this.#fetchChapters(bookId);
      return this.providerData[bookId].map(chapter => chapter.chapterName)

    } catch (err) {
      return err.message
    }

  }
}



module.exports = BooksProvider