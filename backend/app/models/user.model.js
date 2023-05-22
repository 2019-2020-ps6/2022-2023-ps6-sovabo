// User Model
const Joi = require('joi');
const bcrypt = require('bcrypt');
const BaseModel = require('../utils/base-model.js');

class User extends BaseModel {
  constructor() {
    super('User', {
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      codeSoignant: Joi.string().optional()
    });
  }

  async createUser(userObject) {
    // Hash the password before storing in the database
    userObject.password = await bcrypt.hash(userObject.password, 10);
    
    // Then call the create method from the base model
    return this.create(userObject);
  }
}

module.exports = new User();
