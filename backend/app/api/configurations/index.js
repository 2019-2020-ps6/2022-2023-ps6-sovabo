const { Router } = require('express')
const { Configuration } = require('../../models/configuration.model.js')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const configurations = Configuration.get()
    res.status(200).json(configurations)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:configurationId', (req, res) => {
  try {
    const configuration = Configuration.getById(req.params.configurationId)
    res.status(200).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const configuration = Configuration.create(req.body)
    res.status(201).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:configurationId', (req, res) => {
  try {
    const configuration = Configuration.update(req.params.configurationId, req.body)
    res.status(200).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:configurationId', (req, res) => {
  try {
    Configuration.delete(req.params.configurationId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
