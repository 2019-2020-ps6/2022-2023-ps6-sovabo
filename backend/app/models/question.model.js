const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
    id: Joi.number().required(),
    label: Joi.string().required(),
    answers: Joi.array(),
})