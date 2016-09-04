const Logger = require('./logger')
module.exports = {

	createSenecaLogger() {
		// https://github.com/senecajs/seneca/blob/master/docs/examples/custom-logger.js
		const customLogger = new Logger(...arguments)
		function SenecaLogger () {}
		SenecaLogger.preload = function () {
			return {
				extend: {
					logger: (context, payload) => {
// [ 'actid', 'msg', 'entry', 'prior', 'gate', 'caller', 'meta', 'client','listen', 'transport', 'kind', 'case', 'duration', 'result', 'level', 'plugin_name', 'plugin_tag', 'pattern', 'seneca', 'when' ]
						customLogger[payload.level](payload)
					}
				}
			}
		}
		return SenecaLogger
	}
}
