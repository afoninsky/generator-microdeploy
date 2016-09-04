const config = require('config')
const opbeat = Object.assign({}, config.opbeat, {
  active: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging',
  instrument: false, // dont log requests
  addFilter: json => {
    json.extra.env = process.env.NODE_ENV
    return json
  }
})
module.exports = require('opbeat').start(opbeat)
