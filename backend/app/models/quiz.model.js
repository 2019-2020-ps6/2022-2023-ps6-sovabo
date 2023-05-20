const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

const StatQuizzModel = require('./statquizz.model') // assuming you have created statquizz.model.js
const QuestionModel = require('./question.model') // assuming you have created question.model.js

module.exports = new BaseModel('Quiz', {
    hovered: Joi.boolean().optional(),
    id: Joi.string().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    theme: Joi.string().optional(),
    statQuiz: StatQuizzModel.schema,
    questions: Joi.array().items(QuestionModel.schema).required(),
    difficulty: Joi.number().required(),
    image: Joi.string().required(),
})
