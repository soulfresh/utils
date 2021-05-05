module.exports = {
  "extends": [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  "plugins": [
    "jest"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true,
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "default-case": 0,
    "no-sequences": 0,
  },
  "globals": {
    "any": "readonly"
  },
  "ignorePatterns": [
    "**/.eslintrc.js"
  ],
};
