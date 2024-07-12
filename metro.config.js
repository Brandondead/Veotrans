module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    getTransformModulePath: () => {
      return require.resolve('./transformer');
    },
  },
};