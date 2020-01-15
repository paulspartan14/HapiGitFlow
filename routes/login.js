const handlers = require('../handlers/login')
const loginSchema = require('../schemas/loginSchema')

module.exports = [
    {
        method: 'POST',
        path: '/v1/login',
        handler: handlers.login,
        options: {
            validate : {
                payload: loginSchema.login,
                failAction: (request, h , error) => {
                    throw error
                } 
            }
        }
    }
]