const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
// const bcrypt = require('bcryptjs')
// const passport = require('passport')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('./models')
const User = db.User
const Todo = db.Todo

const routes = require('./routes')
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT



app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

app.use(routes)

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

// app.get('/', (req, res) => {
//     console.log(req)
//     return Todo.findAll({
//         raw: true,
//         nest: true,
//         where: {
//             name: 'name-0'
//         }
//     })
//         .then((todos) => { return res.render('index', { todos }) })
//         .catch((error) => { console.log(error) })
// })

// app.get('/users/login', (req, res) => {
//     res.render('login')
// })

// app.post('/users/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login'
// }))

// app.get('/users/register', (req, res) => {
//     res.render('register')
// })

// app.post('/users/register', (req, res) => {
//     const { name, email, password, confirmPassword } = req.body
//     User.findOne({ where: { email } })
//         .then(user => {
//             if (user) {
//                 console.log('This email has been registered.')
//                 return res.render('register', {
//                     name,
//                     email
//                 })
//             }
//             return bcrypt.genSalt(10)
//                 .then(salt => bcrypt.hash(password, salt))
//                 .then(hash => User.create({
//                     name,
//                     email,
//                     password: hash
//                 }))
//                 .then(user => {
//                     res.redirect('/')
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })
//         })
// })

// app.get('/users/logout', (req, res) => {
//     res.send('logout')
// })

// app.get('/todos/:id', (req, res) => {
//     const id = req.params.id
//     return Todo.findByPk(id)
//         .then(todo => { res.render('detail', { todo: todo.toJSON() }) })
//         .catch(error => { console.log(error) })
// })