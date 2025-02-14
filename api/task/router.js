// build your `/api/tasks` router here
const router = require('express').Router()

const Task = require('./model')

router.get('/', async (req, res, next) => {
    try {
      const tasks = await Task.getAll()
      res.json(tasks)
    } catch (err) {
      next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
      const newTask = await Task.create(req.body)
      res.status(201).json(newTask)
    } catch (err) {
      next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 400).json({
      message: err.message
    })
})

module.exports = router
