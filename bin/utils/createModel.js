const fs = require('fs/promises');
const path = require('path');
const { reduxSliceTemplate } = require('../templates/reduxSlice');
const { selectorTemplate } = require('../templates/selector');
const { schemaTemplate } = require('../templates/schema');
const { rtkApiTemplate } = require('../templates/rtkApi');
const { firstLetterToLowerCase } = require('./firstLetterToLowerCase');

const createModel = async ({ sliceName, slicePath, sliceOptions }) => {
  const { withUseActions, withApi, withSelector, withExtraReducers } = sliceOptions;
  const modelPath = (...segments) => path.resolve(slicePath, 'model', ...segments);

  const createFolderStructure = async () => {
    try {
      await fs.mkdir(modelPath(), { recursive: true });
      await fs.mkdir(modelPath('types'), { recursive: true });
      await fs.mkdir(modelPath('slices'), { recursive: true });
      if(withSelector) {
        await fs.mkdir(modelPath('selectors'), { recursive: true });
      }
      if(withApi) {
        await fs.mkdir(modelPath('api'), { recursive: true });
      }
    } catch(e) {
      console.log('Cannot create folder structure', e);
    }
  };

  const createReduxSlice = async () => {
    try {
      await fs.writeFile(
        modelPath('slices', `${firstLetterToLowerCase(sliceName)}Slice.ts`),
        reduxSliceTemplate({
          sliceName,
          useActions: withUseActions,
          extraReducers: withExtraReducers
        })
      );
    } catch(e) {
      console.log('Cannot create slice', e);
    }
  };

  const createSelectors = async () => {
    try {
      await fs.writeFile(
        modelPath('selectors', `${firstLetterToLowerCase(sliceName)}Selectors.ts`),
        selectorTemplate({sliceName: firstLetterToLowerCase(sliceName)})
      )
    } catch(e) {
      console.log('Cannot create selector', e);
    }
  }

  const createSchema = async () => {
    try {
      await fs.writeFile(
        modelPath('types', `${firstLetterToLowerCase(sliceName)}Schema.ts`),
        schemaTemplate({sliceName})
      )
    } catch(e) {
      console.log('Cannot create schema', e);
    }
  }

  const createRtkApi = async () => {
    try {
      await fs.writeFile(
        modelPath('api', `${firstLetterToLowerCase(sliceName)}Api.ts`),
        rtkApiTemplate({sliceName})
      )
    } catch(e) {
      console.log('Cannot create rtk api', e);
    }
  }

  await createFolderStructure();
  await createReduxSlice();
  if(withSelector) {
    await createSelectors();
  }
  await createSchema();
  if(withApi) {
    await createRtkApi();
  }
};

module.exports = { createModel };
