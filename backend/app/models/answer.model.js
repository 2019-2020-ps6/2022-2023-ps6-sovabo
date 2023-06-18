const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  type: Joi.string().optional(),
  value: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
})
