const axios = require('axios');
const { BASE_URL } = require('./constants');

class Provider {
  constructor(apiKey, providerType, enums, apiFilterOption) {
    this.apiKey = apiKey;
    this.providerType = providerType;
    this.searchEnums = enums;
    this.providerData = [];
    this.apiFilterOption = apiFilterOption
  }

  /**
   * @private method , will fetch and save the data of that particular type on the class.
  */
  async #fetchData() {
    try {
      const searchURL = `${BASE_URL}/${this.providerType}`;
      const response = await axios.get(searchURL, { headers: { Authorization: `Bearer ${this.apiKey}` } });
      this.providerData = [...response.data.docs];

    } catch (error) {
      console.log(`[ERROR] Failed to fetch movies ${error.message} @ #fetchMovies`);
      throw new Error('failed to fetch movies')
    }
  }

  /**
   * 
   * @param {string} param the data the user wants to have: name, id ...
   * @returns {Array} of the values that meets the search
   */
  async getAllType(param) {
    if (this.providerData.length === 0) {
      await this.#fetchData()
    }
    return param ? this.providerData.map(value => value[param]) : this.providerData;
  }

  /**
   * will find a wanted value from each extended class
   * @param {string} searchParam 
   * @param {string} value 
   * @returns searched value
   */
  async getTypeByParam(searchParam, value) {
    if (!this.searchEnums[searchParam] || !value) {
      throw new Error(`
        Invalid parameter to search by,
        please provide one of these: ${Object.keys(this.searchEnums[searchParam])}
        and a value
        `);
    }
    if (this.providerData.length === 0) {
      await this.#fetchData();
    }

    if (searchParam !== this.searchEnums.name && value <= 0) {
      throw new Error('invalid value')
    }


    const searchParameter = this.searchEnums[searchParam];
    const requestedData = this.providerData.find(singleDataAsset => singleDataAsset[searchParameter] === value);

    if (!requestedData) {
      throw new Error(`${this.providerType} was not found ,invalid search`);
    }

    return requestedData;
  }
}

module.exports = Provider