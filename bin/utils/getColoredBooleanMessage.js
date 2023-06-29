const chalk = require('chalk');
module.exports = {
  getColoredBooleanMessage: bool => {
    if(Boolean(bool)) {
      return chalk.greenBright.bold('enabled')
    }
    return chalk.redBright.bold('disabled')
  }
}
