const generators = require('yeoman-generator')
const chalk = require('chalk')
const path = require('path')

module.exports = generators.Base.extend({

	initializing: function () {
		this.option('skip-install')
		this.prefix = 'micro'
		this.log(chalk.yellow('Welcome to seneca microservices generator'))
	},

	prompting: function() {

		const author = this.user.git.name() && this.user.git.email() ?
			`${this.user.git.name()} / ${this.user.git.email()}` : ''
		const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Microservice name',
      validate: name => {
				const expr = new RegExp(`^${this.prefix}-[a-zA-Z.-_]+$`)
        if (!expr.test(name)) {
          return `Project name should follow naming convention: "${this.prefix}-{name}"`
        }
        return true
      },
			default: `${this.prefix}-${path.basename(process.cwd()).split('-').pop()}`
    }, {
			type: 'input',
			name: 'description',
			message: 'Project description',
			default: ''
		}, {
			type: 'input',
			name: 'author',
			message: 'Author contact details',
			default: author
		}]

    return this.prompt(prompts).then(props => {
			this.props = props
    })
  },

	configuring: function() {
		this.fs.copy(this.templatePath('\.*'), this.destinationRoot())
		this.fs.copy(this.templatePath('Jenkinsfile'), this.destinationPath('Jenkinsfile'))
		this.fs.copy(this.templatePath('Dockerfile'), this.destinationPath('Dockerfile'))
	},

  writing: function() {
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.props)
		this.directory('bin', 'bin')
		this.directory('src', 'src')
		this.directory('config', 'config')
		this.directory('test', 'test')
  },

	install: function() {
    if (!this.options['skip-install']) {
			this.log(chalk.yellow('Installing npm dependencies...'))
      this.npmInstall()
    } else {
      this.log(chalk.red('You have used the --skip-install option, so I won\'t try to install the dependencies'))
    }
		this.spawnCommandSync('git', ['init'])
		this.spawnCommandSync('git', ['add', '--all'])
		this.spawnCommandSync('git', ['commit', '-m', '"project skeleton"'])
	},

	end: function () {
		const peerDeps = Object.keys(require(`${this.destinationRoot()}/package.json`).peerDependencies)

		this.log(chalk.yellow('YEA! The project has been magically created for you!'))
		this.log(chalk.blue('You can push project into remote repo using this commands:'))
		this.log('	git remote add origin <remote-repo-url>')
		this.log('	git push -u origin master')
		this.log(chalk.blue('Don\'t forget to install unnecessary but recommended packages:'))
		this.log(`	npm install -g ${peerDeps.join(' ')}`)
		this.log(chalk.blue('Available commands:'))
		this.log('	npm start               # launch microservice')
		this.log('	npm test                # launch tests')
		this.log('	npm run test:coverage   # generate coverage report in ./coverage/ folder')
		this.log('	npm run update:deps     # update microservice dependencies')
	}
})
