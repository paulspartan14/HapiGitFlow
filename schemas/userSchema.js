const Joi = require('@hapi/joi')

module.exports = {
    create: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        active: Joi.boolean(),
        password: Joi.string().required()
    },
    query: {
        limit: Joi.number().integer().min(1),
        page: Joi.number().integer().min(1),
        offset: Joi.number().integer(),
        name: Joi.string()
    },
    params: {
        userUuid: Joi.string().uuid({
            version: 'uuidv4'
        })
    }
}