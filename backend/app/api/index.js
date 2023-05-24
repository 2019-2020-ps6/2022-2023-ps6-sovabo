const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const ConfigurationRouter = require('./configurations')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/configurations', ConfigurationRouter)

module.exports = router