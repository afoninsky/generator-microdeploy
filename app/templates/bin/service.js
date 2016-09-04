require('babel-core/register')
require('../src/opbeat')
require('../src/health')

const config = require('config')
const { createSenecaLogger } = require('../src/utils')

const seneca = require('seneca')({
	legacy: {
		logging: false
	}
})

seneca
	.use(createSenecaLogger(config.log, require('../package')))
	.use('../src/microservice', config.microservice)
	.listen(config.listen.port)
