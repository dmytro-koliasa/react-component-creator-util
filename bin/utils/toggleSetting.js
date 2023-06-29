const fs = require('fs/promises')
const path = require('path')
const settingsPath = path.resolve(__dirname, '../settings.json');
const chalk = require('chalk')
const { logger, types } = require('./logger');
const settingsMap = {
  'enableModule': 'Style modules',
  'enableTypescript': 'Typescript',
  'createCss': 'Creating css file',
  'enableCn': 'import classNames and wrap root className',
  'memoComponent': 'Wrap component with memo',

  'withModel': 'Enable/disable adding model to slice',
  'withApi': 'Enable/disable creating rtk api',
  'withSelector': 'Enable/disable creating base selector',
  'withUseActions': 'Enable/disable useActions export from slice',
  'withExtraReducers': 'Enable/disable adding extra reducers template',
}

module.exports = {
  toggleSetting: (key, last = false) => async (bool) => {
    if(bool !== '0' && bool !== '1') throw Error('Available values: 1, 0');
    const envFile = await fs.readFile(settingsPath, { encoding: 'utf-8' });
    const regexp = new RegExp(`\\"${key}\\": \\S+`)
    const boolStr = Number(bool) === 1 ? 'true' : 'false'
    const newData = envFile.replace(regexp, `"${key}": ${boolStr}${last ? '' : ','}`);
    await fs.writeFile(settingsPath, newData);
    logger(`${chalk.cyan(settingsMap[key])} has been ${Number(bool) === 1 ? chalk.greenBright.bold('enabled')  : chalk.redBright.bold('disabled')}`, types.INFO);
  }
}
