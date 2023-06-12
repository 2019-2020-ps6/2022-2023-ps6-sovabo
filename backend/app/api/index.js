const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const ConfigurationRouter = require('./configurations')
const CodeAccesRouter = require('./codeAcces')
const QuestionRouter = require('./quizzes/questions')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/configurations', ConfigurationRouter)
router.use('/codeAcces', CodeAccesRouter)
router.use('/questions', QuestionRouter)


module.exports = router
