const config = require('config')
const Koa = require('koa')
const ld = require('lodash')

const info = Object.assign(ld.pick(require('../package'), ['name', 'version']), {
  NODE_ENV: process.env.NODE_ENV
})

const app = new Koa()

app.use(async () => {
  const { method, url } = this
  if (method !== 'GET') { return }

  switch (url) {
    case '/_ah/health':
      this.body = info
  }
})

module.exports = app.listen(config.healthcheck.port)
