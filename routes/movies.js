const express = require('express')
const router = express.Router()
const knex = require('../knex')


// READ ALL movies
router.get('/', (req, res, next) => {
  knex('movies')
    .then((movies) => {
      res.send(movies)
    })
    .catch((err) => {
      next(err)
    })
})

// READ ONE movie
router.get('/:id', (req, res, next) => {
  //validate all fields
  //vaidate id is a number, escape any special chars that would indicate SQL injection
  knex('movies')
  .where('id', req.params.id)
  .then( (movies ) => {
    res.send(movies[0])
  })
})


// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  //create new movie
  //we'll need some POST body data (good indicator we'll use req.body in some fashion
  console.log('body', req.body);
  //want to do some validation and build a new object based on validated body data
  let newMovie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    rating: req.body.rating,
    poster_url: req.body.poster_url
  }
  knex('movies')
  .insert(newMovie)
  .returning('*')
  .then( (insertedMovie) => {
    console.log('result', insertedMovie )
    res.send(insertedMovie[0])
  })

  // //good to do a .catch after all the.thens to catch any errors
  .catch((error) => {
    next(error)
  })
})


// UPDATE ONE record for this table
router.put('/:id', (req, res, next) => {
  knex('movies')
  .where('id', req.params.id)
  .then( (movie) => {
  if( movie.length > 0 ){
    let updatedMovie = movie[0]
    if( req.body.title ) updatedMovie.title = req.body.title
    if( req.body.director ) updatedMovie.director = req.body.director
    if (req.body.year ) updatedMovie.year = req.body.year
    if( req.body.rating ) updatedMovie.rating = req.body.rating
    if( req.body.poster_url ) updatedMovie.poster_url = req.body.poster_url

    knex('movies')
    .update(updatedMovie)
    .where('id', req.params.id)
    .returning('*')
    .then((resUpdate) => {
      res.send(resUpdate[0])
    })
  } else {
    throw new Error(`Movie number ${id} not found. Unable to update.`)
  }})
  .catch((error) => {
    next(error)
  })
})


// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  knex('movies')
  .where('id', req.params.id)
  .then( (movie) => {

    if( movie.length > 0 ) {
      knex('movies')
      .del()
      .where('id', req.params.id)
      .returning('*')
      .then( (deletedMovie) => {
        res.send(deletedMovie[0])
      })
    } else {
      throw new Error ('Cannot delete a non-existent record')
    }

  })
  .catch((error) => {
    next(error)
  })
})


module.exports = router
