const config = require('config')
const seneca = require('seneca')()

require('./src/opbeat')
require('./src/health')

seneca.use('./src/microservice', config.microservice)
seneca.listen(config.lister.port)
