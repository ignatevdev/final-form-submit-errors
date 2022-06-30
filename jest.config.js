module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        exclude: ['**'],
      },
    },
  },
};
