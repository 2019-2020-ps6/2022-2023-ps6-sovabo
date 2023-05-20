const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('StatQuizz', {
    timeResponses: Joi.array().items(Joi.number()).required(),
})
