const express = require('express')
const router = express.Router()

const db = require('../../models')
// const User = db.User
const Todo = db.Todo

router.get('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    // return Todo.findByPk(id)
    return Todo.findOne({ id: id, UserId: userId })
        .then(todo => { res.render('detail', { todo: todo.toJSON() }) })
        .catch(error => { console.log(error) })
})

router.get('/:id/edit', (req, res) => {
    const userId = req.user.id
    const id = req.params.id

    return Todo.findOne({ where: { id: id, UserId: userId } })
        .then(todo => {
            todo = todo.toJSON()
            res.render('edit', { todo })
        })
        .catch(error => console.log(error))
})


router.put('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const { name, isDone } = req.body

    Todo.update({ name: name, isDone: isDone === 'on' }, { where: { id: id, UserId: userId } })
        .then(() => res.redirect(`/todos/${id}`))
        .catch(error => console.log(error))
})

module.exports = router