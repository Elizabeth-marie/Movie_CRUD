
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {
          id: 1,
          title: 'When Harry Met Sally',
          director: 'Rob Reiner',
          year: 1989,
          rating: 5,
          poster_url:'https://www.imdb.com/title/tt0098635/mediaviewer/rm1579924224'
        },
        {
          id: 2,
          title: 'The Italian Job',
          director: 'F. Gary Gray',
          year: 2003,
          rating: 3,
          poster_url:'https://www.imdb.com/title/tt0317740/mediaviewer/rm2803177216'
        },
        {
          id: 3,
          title: `Ocean's Eleven`,
          director: 'Steven Soderbergh',
          year: 2001,
          rating: 4,
          poster_url: 'https://www.imdb.com/title/tt0240772/mediaviewer/rm3370325760'
        }
      ]);
    });
    .then(() => {
      return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));")
    })
};
