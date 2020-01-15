const Joi = require('@hapi/joi')

module.exports = {
    login: {
        name: Joi.string().required(),
        password: Joi.string().required()
    }
}