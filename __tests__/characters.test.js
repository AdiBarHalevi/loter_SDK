const { TestClient } = require("../index")

test('test movie by param fetching', async () => {
  expect(await TestClient.getAllCharacters())
    .toContainEqual(
      {
        '_id': '5cd99d4bde30eff6ebccfc1f',
        'height': `1.76m / 5'9" (film)`,
        'race': 'Human',
        'gender': 'Male',
        'birth': 'TA 2925',
        'spouse': 'Unnamed wife',
        'death': 'TA 3007',
        'realm': 'Dale',
        'hair': 'Brown (film)',
        'name': 'Bain',
        'wikiUrl': 'http://lotr.wikia.com//wiki/Bain'
      }
    );
});

test('test get all characters by param fetching', async () => {
  expect(await TestClient.getAllCharacters('name'))
    .toContainEqual(
      'Frodo Baggins'
    );
});

