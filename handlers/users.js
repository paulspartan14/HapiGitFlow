const { User } = require('../ps-models')
const uuid4 = require('uuid/v4')
const Boom = require('@hapi/boom')
const { generateHash } = require('../utils/generateHash')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

async function getUser({ query }, h){
    let totalUsers, listUsers, filters = {}
    try{
        totalUsers = await User.count()
    } catch (error) {
        throw Boom.badImplementation('Something went wrong')
    }
    if (query.page && query.offset) throw Boom.badRequest('Only one query param is allowed: offset or page')
    let {
        name, 
        limit = 10,
        page = 1,
        offset = (page - 1) * limit,
    } = query
    const totalPages = Math.ceil(totalUsers / limit)
    if (page === totalPages) limit -= totalPages * limit - totalUsers
    if (name) filters = { name: { [Op.substring ]: name } }
    try {
        listUsers = await User.findAll({ where: filters })
    } catch (error) {
        throw Boom.badImplementation('Something went wrong')
    }
    listUsers = listUsers.slice(offset, offset + limit)
    return h 
        .response({
            page,
            perPage: limit,
            totalUsers,
            users: listUsers
        })
        .code(200)
        .header('Content-Type', 'application/json')
}

async function createUser({ payload }, h) {
    let { active = true } = payload
    payload.active = active
    payload.password = generateHash(payload.password, 10)
    const dataUser = Object.assign(payload, { uuid: uuid4()})
    let user 
    try {
        user = await User.create(dataUser)
    } catch (error) {
        console.log(error)
        throw Boom.badImplementation('Something went wrong') 
    }
    return h
        .response({ id: user.uuid, message: 'Successfully created'})
        .code(201)
        .header('Content-Type', 'application/json')
}
async function getUserByUuid({ params }, h){
    let { userUuid } = params, user
    try {
        user = await User.findOne({ where: { uuid: userUuid }})
    } catch (error) {
        throw Boom.badImplementation('Something went wrong') 
    }
    return h
        .response(user)
        .code(200)
        .header('Content-Type', 'application/json')
}

module.exports = {
    getUser,
    createUser,
    getUserByUuid
}
