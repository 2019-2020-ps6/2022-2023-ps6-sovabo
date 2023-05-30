const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const uuid = require('uuid');
const StatQuizzModel = require('./statquizz.model'); // assuming you have created statquizz.model.js
const QuestionModel = require('./question.model'); // assuming you have created question.model.js

class QuizModel extends BaseModel {
  constructor() {
    super('Quiz', {
      hovered: Joi.boolean().optional(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      theme: Joi.string().optional(),
      statQuiz: StatQuizzModel.schema.optional(),
      questions: Joi.array().items(QuestionModel.schema).required(),
      difficulty: Joi.number().required(),
      image: Joi.string().required(),
    });
  }

  create(obj = {}) {
    const item = { ...obj, id: uuid.v4() };

    console.log('item', item);

    item.statQuiz = StatQuizzModel.createStatQuizz();

    if (item.questions) {
      item.questions = item.questions.map((question) => {
        const newQuestion = {
          ...question,
          id: uuid.v4(),
          answers: question.answers.map((answer) => ({ ...answer, id: uuid.v4() })),
        };
        return newQuestion;
      });
    }

    const { error } = Joi.validate(item, this.schema);
    if (error) throw new ValidationError(`Create Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error);

    this.items.push(item);
    this.save();

    return item;
  }
  


  deleteAll() {
    this.items = [];
    this.save();
  }
}

module.exports = new QuizModel();
