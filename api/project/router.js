// build your `/api/projects` router here
const router = require('express').Router()

const Project = require('./model')

router.get('/', async (req, res, next) => {
    try {
      const projects = await Project.getAll()
      res.json(projects)
    } catch (err) {
      next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
      const newProject = await Project.create(req.body)
      res.status(201).json(newProject)
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