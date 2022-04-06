require('dotenv').config()
const { API_KEY } = process.env

const ApiClient = require('./api_client');

const TestClient = new ApiClient(API_KEY);


module.exports = {
  ApiClient,
  TestClient
}