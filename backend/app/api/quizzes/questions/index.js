const { Router } = require('express')

const { Answer, Quiz, Question } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const AnswersRouter = require('./answers')
const { filterQuestionsFromQuizz, getQuestionFromQuiz } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterQuestionsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    res.status(200).json(question)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    let questions = req.body.questions.map((question) => {
      const answers = question.answers.map((answer) => Answer.create({ ...answer }))
      return Question.create({ label: question.label, answers, quizId })
    })
    const quiz = {
      ...req.body,
      questions,
    }
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})



router.put('/:questionId', (req, res) => {
  try {
    const question = getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    const updatedQuestion = Question.update(req.params.questionId, { label: req.body.label, quizId: question.quizId })
    res.status(200).json(updatedQuestion)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getQuestionFromQuiz(req.params.quizId, req.params.questionId)
    Question.delete(req.params.questionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:questionId/answers', AnswersRouter)

module.exports = router