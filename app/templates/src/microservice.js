const { name } = require('../package')

module.exports = function() {
  this.add('role:test,cmd:echo', (message, done) => {
    done(null, message)
  })

  return name
}
