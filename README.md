# loter_SDK

# Install:
npm i adi_loter_SDK

This SDK provides class to use LOTER API.
# use:
1. config your SDK credentials by importing the class and providing it your API key: 
const loter_SDK = new ApiClient(< your api key >);

2. query directly from the SDK using the following methods:
  # 1.get with options:
      getBooks(< options>):
      provides all the books available in the API , this method allows you to provide filtering options
      available options goes in key value pairs : {option: value}
        limit- string, value - number (will limit the amount responded)
        match- string, value - string (the name of the book)
        exclude - string, value - string (the name of the book to exclude)

    2. simple getter: 
      getMovies() getMoviesQuotes()
      will provide all the movies name
      returns an array
    
    3. general getters:

      getAllChapters(), getAllQuotes()
      returns an array 
      example: getAllChapters(chapterName), 
      will provide all the chapters name, if the search param will not be provided will respond in all the chapters information
      returns an array
    4. 
      getters with a parameter:
        getOneBookByParam(), getOneMovieByParam()
        returns a strings


      will search from all the possible values in return what was provided as parameters 

      this category has another method that allows filtration:
        getMoviesByCriteria("academyAwardNominations", '>20'))
        returns a string array of objects with chapter's data

      example:
        getOneBookByParam(searchParam , paramValue):
          provides the a book that meets this criteria
          accepts the following parameters:
            searchParams- string: "id", "name"
            paramValue - string

    getters with connection to other category:
      getBookByChapterName()
      returns book object , 
      
    getAllChaptersFromABook()
    return array of strings
  

    example:
      getAllChaptersFromABook(bookIdentifier, value):
        provide all chapters from a given book identifier.
        bookIdentifier - string : bookId, book name.
        value - string.


# testing
 In order to run package testing:
 1. create a '.env' file in the package directory
 2. go to the package directory and type npm run tests.