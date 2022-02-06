const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const db = require('./models')
const User = db.User
const Todo = db.Todo

const app = express()
const PORT = 3000

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// app.get('/', (req, res) => {
//     res.send('hello world')
// })

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    return Todo.findAll({
        raw: true,
        nest: true
    })
        .then((todos) => { return res.render('index', { todos }) })
        .catch((error) => { console.log(error) })
})

app.get('/users/login', (req, res) => {
    res.render('login')
})

app.post('/users/login', (req, res) => {
    res.send('login')
})

app.get('/users/register', (req, res) => {
    res.render('register')
})

app.post('/users/register', (req, res) => {
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
            return bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({
                    name,
                    email,
                    password
                }))
                .then(user => {
                    res.redirect('/')
                })
                .catch(error => {
                    console.log(error)
                })
        })
})

app.get('/users/logout', (req, res) => {
    res.send('logout')
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
        .then(todo => { res.render('detail', { todo: todo.toJSON() }) })
        .catch(error => { console.log(error) })
})