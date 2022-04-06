const { TestClient } = require("../index")


test('test movies fetching', async () => {
  expect(await TestClient.getMovies()).toEqual(
    [
      'The Lord of the Rings Series',
      'The Hobbit Series',
      'The Unexpected Journey',
      'The Desolation of Smaug',
      'The Battle of the Five Armies',
      'The Two Towers ',
      'The Fellowship of the Ring',
      'The Return of the King'
    ]
  );
});


test('test movie by param fetching', async () => {
  expect(await TestClient.getOneMovieByParam("rottenTomatoesScore", 94))
    .toMatch('The Lord of the Rings Series');
});

test('test movie by param fetching', async () => {
  expect(await TestClient.getMoviesByCriteria("academyAwardNominations", '>20'))
    .toEqual([
      {
        "_id": "5cd95395de30eff6ebccde56",
        "academyAwardNominations": 30,
        "academyAwardWins": 17,
        "boxOfficeRevenueInMillions": 2917,
        "budgetInMillions": 281,
        "name": "The Lord of the Rings Series",
        "rottenTomatoesScore": 94,
        "runtimeInMinutes": 558
      }]);
});

test('test movie by param fetching', async () => {
  expect(await TestClient.getMoviesQuotes('The Return of the King'))
    .toContainEqual(
      {
        '_id': '5cd96e05de30eff6ebcce84c',
        'dialog': "I didn't think it would end this way.",
        'movie': '5cd95395de30eff6ebccde5d',
        'character': '5cd99d4bde30eff6ebccfe2e',
        'id': '5cd96e05de30eff6ebcce84c'
      }
    );
});

test('test movie by param fetching', async () => {
  expect(await TestClient.getAllQuotes())
    .toContainEqual("I didn't think it would end this way.");
});





