const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
try {
  const config = getDefaultConfig(__dirname);
  withNativeWind(config, { input: './global.css' });
} catch (e) {
  console.log(e.stack);
}
console.log("Success");
