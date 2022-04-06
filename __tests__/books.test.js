const {TestClient} = require("../index")

test('test book fetching', async () => {
  expect(await TestClient.getBooks()).toEqual(
    [
      'The Fellowship Of The Ring',
      'The Two Towers',
      'The Return Of The King'
    ]);
});

test('test book fetching with parameters', async () => {
  expect(
    await TestClient.getBooks({ action: 'exclude', value: 'The Two Towers', param: 'name' })
  ).toEqual(
    [
      'The Fellowship Of The Ring',
      'The Return Of The King'
    ]);
});


test('test get book by ID', async () => {
  expect(await TestClient.getOneBookByParam('id', '5cf5805fb53e011a64671582')).toEqual(
    "The Fellowship Of The Ring");
});

test('test get book by name', async () => {
  expect(await TestClient.getOneBookByParam('name', 'The Return Of The King')).toEqual(
    "The Return Of The King");
});


test('test get book by name', async () => {
  expect(await TestClient.getAllChaptersFromABook('name', 'The Return Of The King')).toEqual(
    [
      'Minas Tirith',
      'The Passing of the Grey Company',
      'The Muster of Rohan',
      'The Siege of Gondor',
      'The Ride of the Rohirrim',
      'The Battle of the Pelennor Fields',
      'The Pyre of Denethor',
      'The Houses of Healing',
      'The Last Debate',
      'The Black Gate Opens',
      'The Tower of Cirith Ungol',
      'The Land of Shadow',
      'Mount Doom',
      'The Field of Cormallen',
      'The Steward and the King',
      'Many Partings',
      'Homeward Bound',
      'The Scouring of the Shire',
      'The Grey Havens'
    ]
  );
});

test('test get book by name', async () => {
  expect(await TestClient.getBookByChapterName("Three is Company")).toEqual(
    { '_id': '5cf5805fb53e011a64671582', 'name': 'The Fellowship Of The Ring' }
    );
});


