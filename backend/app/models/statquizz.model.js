const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')
const uuid = require('uuid');

class StatQuizzModel extends BaseModel {
  constructor() {
    super('Stat', {
      id: Joi.string().required(),
      timeResponses: Joi.array().items(Joi.number()),
    })
  }

  createStatQuizz() {
    const statQuizz = { id: uuid.v4(), timeResponses: [] };
    const { error } = Joi.validate(statQuizz, this.schema);
    if (error) throw new ValidationError(`Create Error : Object ${JSON.stringify(statQuizz)} does not match schema of model ${this.name}`, error);

    this.items.push(statQuizz);
    this.save();
    
    return statQuizz;
  }
}

module.exports = new StatQuizzModel()
