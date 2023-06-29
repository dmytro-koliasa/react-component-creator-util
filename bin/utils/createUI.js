const path = require('path');
const fs = require('fs/promises');
const { firstLetterToUpperCase } = require('./firstLetterToUpperCase');
const { jsxTemplate } = require('../templates/jsx');
const { styleTemplate } = require('../templates/style');
const { indexTemplate } = require('../templates/indexFileTemplate');
const { storiesTemplate } = require('../templates/storyTemplate');

const createUI = async ({sliceName, slicePath, componentOptions}) => {
  const { styleExt, styleModule, typescript, styleFile, classnames, memo, story } = componentOptions;

  const uiPath = (...segments) => path.resolve(slicePath, 'ui', ...segments);
  const componentName = firstLetterToUpperCase(sliceName);

  const createFolderStructure = async () => {
    try {
      await fs.mkdir(uiPath(), { recursive: true });
      await fs.mkdir(uiPath(componentName), { recursive: true });
    } catch(e) {
      console.log('Cannot create folder structure', e);
    }
  };

  const createComponent = async () => {
    const jsxExt = typescript ? '.tsx' : '.jsx'
    try {
      await fs.writeFile(
        uiPath(componentName, `${componentName}${jsxExt}`),
        jsxTemplate({
          fileName: componentName,
          memo,
          styleExt,
          styleModule,
          typescript,
          styleFile,
          classnames
        })
      )
    } catch(e) {
      console.log('Cannot create component', e);
    }
  }

  const createStory = async () => {
    const jsxExt = typescript ? '.tsx' : '.jsx'
    try {
      await fs.writeFile(
        uiPath(componentName, `${componentName}.stories${jsxExt}`),
        storiesTemplate({fileName: componentName, typescript})
      )
    } catch(e) {
      console.log('Cannot create story', e);
    }
  }
  const createStyleFile = async () => {
    try {
      await fs.writeFile(
        uiPath(componentName, `${componentName}${styleModule ? '.module' : ''}${styleExt}`),
        styleTemplate()
      )
    } catch(e) {
      console.log('Cannot create style file', e);
    }
  }

  const createIndexFile = async () => {
    const indexExt = typescript ? '.ts' : '.js'
    try {
      await fs.writeFile(
        uiPath(componentName, `index${indexExt}`),
        indexTemplate(componentName)
      )
    } catch (e) {
      console.log('Cannot create index file', e);
    }
  }
  await createFolderStructure();
  await createComponent();
  if(story) {
    await createStory();
  }
  if(styleFile) {
    await createStyleFile();
  }
  await createIndexFile();
};

module.exports = { createUI };
