// jest.setup.js
// extend-expect is built-in from @testing-library/react-native v12+

global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

global.__ExpoImportMetaRegistry = {
  register: () => {},
  get: () => null,
};

global.structuredClone = global.structuredClone || ((obj) => JSON.parse(JSON.stringify(obj)));

// Mock scaling utility
jest.mock('./src/utils/scaling', () => ({
  scale: (size) => size,
  verticalScale: (size) => size,
  moderateScale: (size) => size,
}));

// Mock common styles
jest.mock('./src/styles/common', () => ({
  commonStyles: {
    container: { flex: 1 },
    background: { flex: 1 },
  },
}));
