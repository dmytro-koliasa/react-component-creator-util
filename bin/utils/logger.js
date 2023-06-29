const chalk = require('chalk');
const types = {
    DEFAULT: "whiteBright",
    INFO: "yellowBright",
    ERROR: "redBright",
    SUCCESS: "greenBright",
}
module.exports = {
  types,
  logger: (message, type = types.DEFAULT) => {
    console.log(`${chalk[type]('[info]:')} ${message}`);
  }
}
