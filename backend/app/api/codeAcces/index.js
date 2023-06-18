const { Router } = require('express')
const CodeAcces = require('../../models/codeAcces.model.js')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const codes = CodeAcces.get()
    res.status(200).json(codes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:codeId', (req, res) => {
  try {
    const code = CodeAcces.getById(req.params.codeId)
    res.status(200).json(code)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:codeId', (req, res) => {
  try {
    CodeAcces.delete(req.params.codeId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
