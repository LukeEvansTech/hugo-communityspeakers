import defaultConfig from "/action/lib/.automation/eslint.config.mjs";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

export default [
  ...defaultConfig,
  {
    files: [".devcontainer/**/*.json", ".vscode/*.json"],
    rules: { "jsonc/no-comments": "off" },
  },
  {
    rules: {
      "n/no-missing-import": "off",
      "n/no-missing-require": "off",
      "n/no-extraneous-import": "off",
      "n/no-extraneous-require": "off",
      "n/no-unpublished-import": "off",
      "n/no-unpublished-require": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // The TS variant has to sit in a config object that also declares
    // the plugin: flat config resolves plugin rules per-object.
    files: ["**/*.ts", "**/*.cts", "**/*.mts", "**/*.tsx"],
    plugins: { "@typescript-eslint": typescriptEslint },
    rules: {
      // plugin:@typescript-eslint/recommended turns the base rule off
      // for TS because it cannot read type-signature parameter names
      // (`(msg: string) => void` in an interface) and reports them as
      // unused. Re-assert that, since the object above re-enabled it.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
