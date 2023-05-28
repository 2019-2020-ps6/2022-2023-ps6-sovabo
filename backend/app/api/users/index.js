const { Router } = require('express')
const User = require('../../models/user.model.js')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    console.log('users')
    const users = User.get()
    console.log('users2')

    res.status(200).json(users)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    const user = User.getById(req.params.userId)
    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    console.log("ici")

    const user = User.createUser(req.body)
    console.log("ici2")

    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    const user = User.update(req.params.userId, req.body)
    res.status(200).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
