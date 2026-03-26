const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');

const isSigningEnabled = process.env.APPLE_TEAM_ID && process.env.APPLE_API_KEY_ID;

module.exports = {
  packagerConfig: {
    name: 'Prompt Keeper',
    asar: true,
    ...(isSigningEnabled && {
      osxSign: {
        identity: 'Developer ID Application',
        entitlements: path.join(__dirname, 'entitlements.plist'),
        'entitlements-inherit': path.join(__dirname, 'entitlements.plist'),
      },
      osxNotarize: {
        tool: 'notarytool',
        appleApiKey: process.env.APPLE_API_KEY_PATH,
        appleApiKeyId: process.env.APPLE_API_KEY_ID,
        appleApiIssuer: process.env.APPLE_API_ISSUER,
      },
    }),
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'PromptKeeper',
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
