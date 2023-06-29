const indexTemplate = (fileName) =>
`export { ${fileName} } from './${fileName}';
`
module.exports = {indexTemplate}
