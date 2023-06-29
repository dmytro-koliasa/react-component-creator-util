const selectorTemplate = ({ sliceName }) =>
`import { StoreSchema } from '@/shared/types/store';

export const getTemplate = (state: StoreSchema) => state.${sliceName}.template;
`;

module.exports = { selectorTemplate };
