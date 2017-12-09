'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const upperCamelCase = require('uppercamelcase')

module.exports = class extends Generator {
  prompting() {
    console.log(chalk.yellow('---------'))
    console.log(chalk.yellow('    Ω    '))
    console.log(chalk.yellow('---------'))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name?',
        validate: function(answer) {
          if (answer.length < 1) {
            return 'Provide a name.'
          }
          return true
        }
      },
      {
        type: 'input',
        name: 'element',
        message: 'Element?',
        default: 'div'
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('styledComponent.js'),
      this.destinationPath(`${upperCamelCase(this.props.name)}/index.js`),
      {
        name: upperCamelCase(this.props.name),
        element: this.props.element
      }
    )
  }
}
