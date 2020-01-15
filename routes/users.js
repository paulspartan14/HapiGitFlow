const handlers = require('../handlers/users')
const userSchema = require('../schemas/userSchema')

module.exports = [
    {
        method: 'GET',
        path: '/v1/users',
        handler: handlers.getUser,
        options: {
            validate: {
                query: userSchema.query,
                failAction: (request, h, error) => {
                    throw error
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/v1/users',
        handler: handlers.createUser,
        options: {
            validate: {
                payload: userSchema.create,
                failAction: (request, h, error) => {
                    throw error
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/v1/users/{userUuid}',
        handler: handlers.getUserByUuid,
        options: {
            validate: {
                params: userSchema.params,
                failAction: (request, h, error) => {
                    throw error
                }
            }
        }
    }
]


