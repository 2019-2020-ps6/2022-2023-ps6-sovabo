const { Router } = require('express')

const { Quiz, Question } = require('../../models')
const QuestionsRouter = require('./questions')
const manageAllErrors = require('../../utils/routes/error-management')
const { buildQuizz, buildQuizzes } = require('./manager')

const router = new Router()

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create(req.body)
    const builtQuiz = buildQuizz(quiz.id)
    res.status(201).json(req.body)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:quizId/questions', QuestionsRouter)


router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
