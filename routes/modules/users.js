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
    const errors = []

    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'All fields are requried.' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: 'Passowrds do not match.' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email
        })
    }
    User.findOne({ where: { email } })
        .then(user => {
            if (user) {
                errors.push({ 'message': 'This email has been registered' })
                return res.render('register', {
                    errors,
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
    req.logout()
    req.flash('success_msg', 'Log out successfully.')
    res.redirect('/users/login')
})

module.exports = router