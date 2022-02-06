const express = require('express')
const router = express.Router()

const db = require('../../models')
// const User = db.User
const Todo = db.Todo

router.get('/', (req, res) => {
    const userId = req.user.id
    return Todo.findAll({
        raw: true,
        nest: true,
        where: {
            UserId: userId
        }
    })
        .then((todos) => { return res.render('index', { todos }) })
        .catch((error) => { console.log(error) })
})

module.exports = router