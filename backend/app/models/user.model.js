// User Model
const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const ConfigurationModel = require('./configuration.model.js');
const StatQuizzModel = require('./statquizz.model.js');
const uuid = require('uuid')


class User extends BaseModel {
  constructor() {
    super('User', {
      id: Joi.string().required(),
      name: Joi.string().required(),
      imagePath: Joi.string().required(),
      color: Joi.string().required(),
      configuration: ConfigurationModel.schema.required(),
      listeStatQuizz: Joi.array().items(StatQuizzModel.schema),
      selected: Joi.boolean().required(),
    });
  }
  getConfiguration(userId) {
    const user = this.getById(userId);
    if (!user) throw new NotFoundError(`Cannot get User id=${userId} : not found`)
    return user.configuration;
  }

  updateStatQuizz(userId, quizzId, statQuizzData) {
    const user = this.getById(userId);
    if (!user) throw new NotFoundError(`Cannot get User id=${userId} : not found`);
    
    let statQuizz = user.listeStatQuizz.find(r => r.idQuizz === quizzId);
    
    if (statQuizz) {
      // update existing statQuizz
      statQuizz.nbMissClicks = statQuizzData.nbMissClicks;
      statQuizz.timeResponses = statQuizzData.timeResponses;
      statQuizz.FreqInteractAnim = statQuizzData.FreqInteractAnim;
      statQuizz.resultatQuizz = statQuizzData.resultatQuizz;
    } else {
      // create new statQuizz
      const newStatQuizz = StatQuizzModel.create(statQuizzData);
      user.listeStatQuizz.push(newStatQuizz);
    }
    
    this.save();
    return user;
  }
  
  
  

  createUser(obj = {}) {
    const newConfig = ConfigurationModel.create(obj.configuration || {});
    const newUser = { 
      ...obj, 
      id: uuid.v4(), 
      configuration: newConfig, 
      listeStatQuizz: [], 
      selected: false 
    };
    const { error } = Joi.validate(newUser, this.schema);
    if (error) throw new ValidationError(`Create User Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error);
    this.items.push(newUser);
    this.save();

    return newUser;
  }

  deleteAll() {
    this.items = [];
    this.save();
  }
}

module.exports = new User();
