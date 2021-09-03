//#region JEST_CONFIG_ESM
const FLAG_JEST_ESM_NATIVE = process.env["NODE_OPTIONS"]?.includes(
  "--experimental-vm-modules"
);

//#region adjustMe
const HARDCODE_ESMONLY = FLAG_JEST_ESM_NATIVE
  ? // no need to set
    ""
  : // ESM-only `node-fetch` depends on ESM-only `fetch-blob`
    // Just recursive it down.
    "node-fetch|fetch-blob|@loynoir/example-";
//#endregion adjustMe

const JEST_CONFIG_ESM = FLAG_JEST_ESM_NATIVE
  ? {
      preset: "ts-jest/presets/default-esm",
      globals: {
        "ts-jest": {
          tsconfig: "<rootDir>/config/tsconfig.jest-ESM.json",
          useESM: true,
        },
      },
    }
  : {
      preset: "ts-jest/presets/js-with-ts-esm",
      globals: {
        "ts-jest": {
          tsconfig: "<rootDir>/config/tsconfig.jest-ESM-soft.json",
        },
      },

      // default: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"]

      // notice: `<rootDir>` is the place holder used by jest
      // no need to replace it
      transformIgnorePatterns: [
        `<rootDir>/node_modules/(?!(\\.pnpm/.*?node_modules/|)(${HARDCODE_ESMONLY}))`,

        `<rootDir>/\\.yarn/cache/.*?/node_modules/(?!${HARDCODE_ESMONLY})`,

        "\\.pnp\\.[^\\/]+$",
      ],
    };

//#endregion JEST_CONFIG_ESM

export default {
  testMatch: ["<rootDir>/test/**/?(*.)+(spec|test).[tj]s?(x)"],
  ...JEST_CONFIG_ESM,
};
