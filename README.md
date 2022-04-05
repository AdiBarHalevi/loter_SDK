# loter_SDK

# Install:
npm i adi_loter_sdk

This SDK provides class to use LOTER API.

# use:
1. config your SDK credentials by importing the class and providing it your API key: 
const loter_SDK = new ApiClient(< your api key >);
2. query directly from the SDK using the following methods:
getBooks ,
getOneBookByParam,
getAllChaptersFromABook,
getMovies,
getOneMovieByParam,
getMoviesByCriteria,
getMoviesQuotes,
getAllQuotes,
getAllChapters,
getBookByChapterName,
getAllCharacters

3. results - the SDK will provide you an Array of with the requested results.
