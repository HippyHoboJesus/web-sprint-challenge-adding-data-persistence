// build your `/api/resources` router here
const router = require('express').Router()

const Resource = require('./model')

router.get('/', async (req, res, next) => {
    try {
      const resources = await Resource.getAll()
      res.json(resources)
    } catch (err) {
      next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
      const newResource = await Resource.create(req.body)
      res.status(201).json(newResource)
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
