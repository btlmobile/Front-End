const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

module.exports = (async () => {
  const config = await getSentryExpoConfig(__dirname);
  const { resolver } = config;
  const { sourceExts, assetExts } = resolver;

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetRegistryPath: require.resolve('react-native/Libraries/Image/AssetRegistry'),
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  };

  return config;
})();