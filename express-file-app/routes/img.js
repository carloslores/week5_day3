const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })


const Picture = require('../models/Picture')


router.get('/add', (req, res, next) => res.render('imageform'))

router.post('/upload', upload.single('photo'), (req, res) => {

    const pic = new Picture({
        name: req.body.name,
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname
    })

    pic.save()
        .then(x => res.redirect('/images'))
        .catch(e => console.log(e))
});



router.get('/', (req, res) => {
    Picture.find()
        .then(pictures => res.render('gallery', { pictures }))
        .catch(e => console.log(e))
})

module.exports = router 