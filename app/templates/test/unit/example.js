const { test } = require('ava')

const seneca = require('seneca')()
seneca.use('../../src/microservice')

test.cb('emit not existing route', t => {
  seneca.act('role:test,cmd:nosuch', err => {
    t.regex(err.message, /No matching action pattern found/)
    t.end()
  })
})

test.cb('ensure echo returned', t => {
  const payload = { some: 'data' }
  seneca.act('role:test,cmd:echo', payload, (err, res) => {
    t.is(res.some, payload.some)
    t.end(err)
  })
})
