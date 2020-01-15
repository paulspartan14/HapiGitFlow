/*eslint-env jest */

const expect = require('expect')
const server = require('../index')

beforeAll((done) => {
    server.events.on('start', () => {
        done()
    })
})

afterAll((done) => {
    server.events.on('stop', () => {
        done()
    })
    server.stop()
})

const header = {
    url: '/v1/login'
}

const correctPayload = {
    name: 'admin',
    password: 'admin'
}

const incorrectPayload = {
    name: 'sfvwerv',
    password: 'screv'
}

test('Regresa un token y un mensaje de autentificacion correcta', async function(done){
    expect.assertions(2)
    const req = Object.assign({}, header, { method: 'POST'}, { payload: correctPayload})
    const res = await server.inject(req)
    expect(res.statusCode).toBe(200)
    expect(res.result).toHaveProperty('token')
    done()
})

test('Regresa un error por mandar credenciales incorrectas', async function (done) {
    expect.assertions(1)
    const req = Object.assign({}, header, { method: 'POST' }, { payload: incorrectPayload })
    const res = await server.inject(req)
    expect(res.statusCode).toBe(401)
    done()
})

