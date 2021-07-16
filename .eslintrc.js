module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
      mocha: true,
    },
    extends: ["airbnb-base", "plugin:vue/recommended", "prettier", "eslint:recommended"],
    globals: {
      expect: true,
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "babel-eslint",
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["vue", "prettier"],
    rules: {
      "prettier/prettier": "error",
      "no-console": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-unresolved": 0,
      "vue/html-self-closing": 0,
      "vue/max-attributes-per-line": 0,
      "no-unused-vars": 0,
      "vue/valid-template-root": 0
    },
  };
  