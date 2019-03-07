const express = require('express')
const router = express.Router()
const uploadCloud = require('../config/cloudinary.js');

const Movie = require('../models/movie.js')



// Mostrar vista de películas pasándole todos los documentos del modelo Movie
router.get('/view', (req, res) => {
    Movie.find()
        .then((movies) => res.render('view-movies', { movies }))
        .catch((error) => console.log(error))
})


// Mostrar vista de añadir película y gestionar inclusión de nueva película en Cloudinary y BBDD
router.get('/add', (req, res) => res.render('add-movie'))
router.post('/add', uploadCloud.single('photo'), (req, res) => {
    const { title, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newMovie = new Movie({ title, description, imgPath, imgName })
    newMovie.save()
        .then(movie => res.redirect('/movies/view'))
        .catch(error => console.log(error))
})


module.exports = router