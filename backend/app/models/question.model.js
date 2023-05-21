const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const AnswerModel = require('./answer.model');

const QuestionModel = new BaseModel('Question', {
  label: Joi.string().required(),
  answers: Joi.array().items(AnswerModel.schema).required(),
});

QuestionModel.deleteAll = function () {
  this.items = [];
  this.save();
};

module.exports = QuestionModel;
