const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const { firstLetterToLowerCase } = require('../utils/firstLetterToLowerCase');
const rtkApiTemplate = ({ sliceName }) =>
`import { rtkApi } from '@/shared/api/rtkApi';

const ${firstLetterToLowerCase(sliceName)}Api = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    get${firstLetterToUpperCase(sliceName)}: build.query<any, void>({
      query: () => ({
        url: '/${firstLetterToLowerCase(sliceName)}',
      }),
    }),
  }),
});

export const use${firstLetterToUpperCase(sliceName)} = ${firstLetterToLowerCase(sliceName)}Api.useGet${firstLetterToUpperCase(sliceName)}Query;

export const { get${firstLetterToUpperCase(sliceName)} } = ${firstLetterToLowerCase(sliceName)}Api.endpoints;
`;

module.exports = { rtkApiTemplate };
