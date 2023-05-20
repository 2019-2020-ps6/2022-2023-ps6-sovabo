const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const AnswerModel = require('./answer.model') // assuming answer.model.js is in the same directory

module.exports = new BaseModel('Question', {
    id: Joi.string().required(),
    label: Joi.string().required(),
    answers: Joi.array().items(AnswerModel.schema).required(),
})
