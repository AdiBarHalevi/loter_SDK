const BASE_URL = 'https://the-one-api.dev/v2/'
const BOOKS_SEARCH_PARAMS_ENUM = {
  id: '_id',
  name: 'name',
  order: 'order'
}

const MOVIES_SEARCH_PARAMS_ENUM ={
    id: "_id",
    name: 'name',
    runtimeInMinutes:'runtimeInMinutes',
    budgetInMillions:'budgetInMillions',
    boxOfficeRevenueInMillions:'boxOfficeRevenueInMillions',
    academyAwardNominations:'academyAwardNominations',
    academyAwardWins:'academyAwardWins',
    rottenTomatoesScore:'rottenTomatoesScore'
}

const NUMBER_OF_BOOKS = 3

module.exports = {BASE_URL, BOOKS_SEARCH_PARAMS_ENUM,NUMBER_OF_BOOKS ,MOVIES_SEARCH_PARAMS_ENUM}