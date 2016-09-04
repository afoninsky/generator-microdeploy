const generators = require('yeoman-generator')
const chalk = require('chalk')
const path = require('path')

module.exports = generators.Base.extend({

	constructor: function () {
		generators.Base.apply(this, arguments)
		this.option('skip-install')
	},

	initializing: function () {
		this.log(chalk.yellow('Welcome to microservices generator'))
	},

	prompting: function() {

		const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your microservice name',
      validate: function(name) {
        if (!/^microservice-[a-zA-Z.-_]+$/.test(name)) {
          return 'Project should be named in format "microservice-{name}"'
        }
        return true
      },
			default: `microservice-${path.basename(process.cwd())}`
    }, {
			type: 'input',
			name: 'username',
			message: 'Your name',
			default: this.user.git.name()
		}, {
			type: 'input',
			name: 'email',
			message: 'Your email',
			default: this.user.git.email()
		}]

    // return this.prompt(prompts).then(props => {
		// 	this.props = props
    //   this.log(this.props)
    // })
  },

  writing: function() {
		this.fs.copy(this.templatePath('**'), this.destinationPath('.'))
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.props)
  },

	install: function() {
    if (!this.options['skip-install']) {
      this.npmInstall()
    } else {
      this.log('You have used the --skip-install option, so I won\'t try to install the dependencies')
    }
	},

	end: function () {
		this.log(chalk.yellow('YEA! The project has been magically created for you!'))
	}
})
