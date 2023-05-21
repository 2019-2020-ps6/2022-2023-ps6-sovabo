const { Quiz, Question } = require('../../models')

const buildQuizzes = () => {
  const quizzes = Quiz.get()
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = Question.get().filter((question) => question.quizId === quiz.id)
  return { ...quiz, questions }
}
  

module.exports = {
  buildQuizzes,
  buildQuizz
}
