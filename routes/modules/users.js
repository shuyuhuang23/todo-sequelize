const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models')
const User = db.User
// const Todo = db.Todo

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ where: { email } })
        .then(user => {
            if (user) {
                console.log('This email has been registered.')
                return res.render('register', {
                    name,
                    email
                })
            }
            if (password !== confirmPassword) {
                console.log('Passwords do not match.')
                return res.render('register', {
                    name,
                    email
                })
            }

            return bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password: hash
                }))
                .then(user => {
                    res.redirect('/')
                })
                .catch(error => {
                    console.log(error)
                })
        })
})

router.get('/logout', (req, res) => {
    res.send('logout')
})

module.exports = router