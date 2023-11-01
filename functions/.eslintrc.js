module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    indent: ["error", 2],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        functions: "never",
      },
    ],
    "max-len": ["error", 120],
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    "import/no-unresolved": 0,
    "object-curly-spacing": [2, "always"],
    "operator-linebreak": 0,
    "wrap-iife": 0,
    "func-names": 0,
    "no-param-reassign": [2, { props: false }],
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "no-underscore-dangle": 0,
    "no-new": process.env.NODE_ENV === "production" ? 1 : 0,
    "no-console": process.env.NODE_ENV === "production" ? 1 : 0,
    "no-alert": process.env.NODE_ENV === "production" ? 1 : 0,
    "linebreak-style": 0,
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
};
