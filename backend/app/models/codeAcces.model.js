const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');
const uuid = require('uuid')

class CodeAcces extends BaseModel {
    constructor() {
        super('CodeAcces', {
            code: Joi.string().required(),
        });
    }

    create(obj = {}) {
        if (this.items.length > 0) {
            return this.items[0];
        }

        const defaults = {
            code: '',
        };
        const newCode = { ...defaults, ...obj, id: uuid.v4() };
        const { error } = Joi.validate(newCode, this.schema);
        if (error) throw new ValidationError(`Create CodeAcces Error : Object ${JSON.stringify(obj)} does not match schema of model ${this.name}`, error);
        this.items.push(newCode);
        this.save();
        return newCode;
    }


    deleteAll = function () {
        this.items = [];
        this.save();
    }
}
module.exports = new CodeAcces();