const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
    hovered: Joi.boolean().required(),
    id: Joi.number().required(),
    name: Joi.string().required(),
    desc: Joi.string().required(),
    theme: Joi.string().required(),
    questions: Joi.array().required(),
    difficulty: Joi.string(),
    image: Joi.string(),
})