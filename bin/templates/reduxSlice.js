const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const { firstLetterToLowerCase } = require('../utils/firstLetterToLowerCase');
const reduxSliceTemplate = ({ sliceName, useActions, extraReducers }) => {
  const typeName = firstLetterToUpperCase(sliceName);
  const nameOfSlice = firstLetterToLowerCase(sliceName);
  return (
`import { PayloadAction${useActions ? '' : ', createSlice'} } from '@reduxjs/toolkit';
${useActions ? `import { buildSlice } from '@/shared/lib/utils/buildSlice';` : ''}
import { ${typeName}Schema } from '../types/${nameOfSlice}Schema';

const initialState:${typeName}Schema = {
  
};

export const ${nameOfSlice}Slice = ${useActions ? 'buildSlice': 'createSlice'}({
  name: '${nameOfSlice}',
  initialState,
  reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    ${extraReducers ? `// extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },`: ''}
});

export const { reducer: ${firstLetterToLowerCase(sliceName)}Reducer } = ${nameOfSlice}Slice;
${useActions ? `export const { useActions: use${firstLetterToUpperCase(sliceName)}Actions } = ${nameOfSlice}Slice;` : `export const { actions: ${nameOfSlice}Actions } = ${nameOfSlice}Slice`}
`);
};

module.exports = { reduxSliceTemplate };
