const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const schemaTemplate = ({ sliceName }) =>
`export interface ${firstLetterToUpperCase(sliceName)}Schema {
  
}
`;

module.exports = { schemaTemplate };
