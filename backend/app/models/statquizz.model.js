const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Stat', {
    id: Joi.number(), // l'ID n'est pas requis ici
    timeResponses: Joi.array().items(Joi.number()),
})
