// User Model
const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const ConfigurationModel = require('./configuration.model.js');
const uuid = require('uuid')


class User extends BaseModel {
  constructor() {
    super('User', {
      name: Joi.string().required(),
      imagePath: Joi.string().required(),
      color: Joi.string().required(),
      configuration: ConfigurationModel.schema.required(),
      selected: Joi.boolean().required(),
    });
  }


  createUser(obj = {}) {
    console.log("ici3")

    const newConfig = ConfigurationModel.create(obj.configuration || {});
    console.log("ici apres")

    const newUser = { ...obj, id: uuid.v4(), configuration: newConfig, selected: false };
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
