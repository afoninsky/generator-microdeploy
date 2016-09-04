const generators = require('yeoman-generator')
const chalk = require('chalk')
const path = require('path')

module.exports = generators.Base.extend({

	constructor: function () {
		generators.Base.apply(this, arguments)
		this.option('skip-install')
	},

	initializing: function () {
		this.log(chalk.yellow('Welcome to seneca microservices generator'))
	},

	prompting: function() {

		const author = this.user.git.name() && this.user.git.email() ?
			`${this.user.git.name()} / ${this.user.git.email()}` : ''
		const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Microservice name',
      validate: function(name) {
        if (!/^micro-[a-zA-Z.-_]+$/.test(name)) {
          return 'Project should be named in format "micro-{name}"'
        }
        return true
      },
			default: `micro-${path.basename(process.cwd())}`
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
      this.log(this.props)
    })
  },

	configuring: function() {
		this.fs.copy(this.templatePath('.*'), this.destinationRoot())
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
      this.npmInstall()
    } else {
      this.log('You have used the --skip-install option, so I won\'t try to install the dependencies')
    }
		this.spawnCommandSync('git', ['init'])
		this.spawnCommandSync('git', ['add', '--all'])
		this.spawnCommandSync('git', ['commit', '-m', '"initial commit from generator"'])
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
		this.log('	npm start           # launch microservice')
		this.log('	npm test            # perform testing')
		this.log('	npm test:coverage   # generate coverage report in ./coverage/ folder')
		this.log('	npm update:deps     # update microservice dependencies')
	}
})
