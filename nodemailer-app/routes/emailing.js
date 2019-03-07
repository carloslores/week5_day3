const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

router.get('/form', (req, res) => res.render('form'))

router.post('/send-email', (req, res) => {

    let { email, subject, message } = req.body

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'pepe.ironhack@gmail.com',
            pass: 'pepe1234Ironhack'
        }
    })

    transporter.sendMail({
        from: 'Información al consumidor 🤬 <myawesome@project.com>',
        to: email,
        subject: subject,
        text: message
    })
        .then(info => res.render('confirmation-message', { email, subject, message }))
        .catch(e => console.log(e))
})

module.exports = router