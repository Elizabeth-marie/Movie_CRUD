
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
          poster_url:'https://m.media-amazon.com/images/M/MV5BMjE0ODEwNjM2NF5BMl5BanBnXkFtZTcwMjU2Mzg3NA@@._V1_SY1000_CR0,0,666,1000_AL_.jpg'
        },
        {
          id: 2,
          title: 'The Italian Job',
          director: 'F. Gary Gray',
          year: 2003,
          rating: 3,
          poster_url:'https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg'
        },
        {
          id: 3,
          title: `Ocean's Eleven`,
          director: 'Steven Soderbergh',
          year: 2001,
          rating: 4,
          poster_url: 'https://m.media-amazon.com/images/M/MV5BYzVmYzVkMmUtOGRhMi00MTNmLThlMmUtZTljYjlkMjNkMjJkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,675,1000_AL_.jpg'
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));")
    })
};
