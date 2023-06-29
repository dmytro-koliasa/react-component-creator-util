const settings = require('../settings.json');
const path = require('path')
const fs = require('fs/promises')
const { program } = require('commander');
const { jsxTemplate } = require('../templates/jsx');
const { styleTemplate } = require('../templates/style');
const { indexTemplate } = require('../templates/indexFileTemplate');
const chalk = require('chalk');
const { logger, types } = require('./logger');
const { storiesTemplate } = require('../templates/storyTemplate');

module.exports = {
  createComponent: (initialPath) => async (name) => {
    const dir = path.resolve(initialPath, settings.component.relPath, name);
    const fileName = path.parse(dir).name;

    const { styleExt, styleModule, typescript, styleFile, classnames, memo, story } = program.opts();

    const jsxExt = typescript ? '.tsx' : '.jsx';
    const indexExt = typescript ? '.ts' : '.js';

    const jsxFilePath = path.resolve(dir, `${fileName}${jsxExt}`);
    const storiesFilePath = path.resolve(dir, `${fileName}.stories${jsxExt}`);
    const styleFilePath = path.resolve(dir, `${fileName}${styleModule ? '.module' : ''}${styleExt}`);
    const indexFilePath = path.resolve(dir, `index${indexExt}`);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(jsxFilePath, jsxTemplate({ fileName, styleExt, styleModule, typescript, styleFile, classnames, memo }));
    if(styleFile) {
      await fs.writeFile(styleFilePath, styleTemplate());
    }
    if(story) {
      await fs.writeFile(storiesFilePath, storiesTemplate({fileName, typescript}))
    }
    await fs.writeFile(indexFilePath, indexTemplate(fileName));
    logger(`Component ${chalk.whiteBright.bold(fileName)} has been successfully created!`, types.SUCCESS);
  }
}
