var path = require('path');

var rulesForJs = {
  'quotes' : [
    'warn',
    'single',
    { avoidEscape : true },
  ],
  'require-jsdoc' : ['off'],
  'valid-jsdoc'   : ['off'],
  'indent'        : [
    'error',
    2,
    {
      SwitchCase         : 1,
      VariableDeclarator : {
        'var'   : 2,
        'let'   : 2,
        'const' : 3,
      },
      ignoredNodes : ['ConditionalExpression'],
    },
  ],
  'key-spacing' : [
    'error',
    {
      singleLine : {
        beforeColon : true,
        afterColon  : true,
      },
      multiLine : {
        beforeColon : true,
        afterColon  : true,
        align       : 'colon',
      },
    },
  ],
  'keyword-spacing' : [
    'error',
    {
      before : true,
      after  : true,
    },
  ],
  'spaced-comment' : [
    'error',
    'always',
    {
      exceptions : ['-', '+', '=', '*'],
      markers    : ['=', '*/', '/*', 'X', '//'],
    },
  ],
  'no-multi-spaces' : [
    1,
    {
      exceptions : {
        VariableDeclarator : true,
      },
    },
  ],
  'no-cond-assign' : [2, 'except-parens'],
  // "no-redeclare"   : [
  //   "error",
  //   {
  //     builtinGlobals : true,
  //   },
  // ],
  'no-redeclare'   : 'off',
  'dot-notation'   : [
    2,
    {
      allowKeywords : true,
    },
  ],
  'eqeqeq'      : [2, 'smart'],
  'no-plusplus' : [
    'warn',
    {
      allowForLoopAfterthoughts : true,
    },
  ],
  'one-var' : [
    'off', // Enable once tests are set up
    'consecutive',
  ],
  'object-curly-spacing' : [
    'error',
    'always',
    {
      objectsInObjects : false,
      arraysInObjects  : false,
    },
  ],
  'quote-props' : [
    'error',
    'consistent-as-needed',
    {
      keywords : true,
    },
  ],
  'camelcase' : ['warn'],
  'max-len'   : ['warn', {
    code : 140,
  }],
  'new-cap' : ['warn'],

  'key-spacing' : [
    'error',
    {
      singleLine : {
        beforeColon : true,
        afterColon  : true,
      },
      multiLine : {
        beforeColon : true,
        afterColon  : true,
        align       : 'colon',
      },
    },
  ],
  'no-empty-function' : 'off',
  'no-unused-vars'    : 'off',
};

var rulesForTypescript = {
  '@typescript-eslint/no-redeclare'                            : ['error'],
  '@typescript-eslint/no-empty-function'                       : 'off',
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing' : 'warn',
  '@typescript-eslint/no-unused-vars'                          : ['warn', {
    varsIgnorePattern : '^_',
    argsIgnorePattern : '^_' ,
  }],
};

var rulesForReact = {
  'react/prop-types'          : 'off',
  'react/no-unknown-property' : ['error', { ignore : ['css']}],
};

var rulesForEmotion = {
  '@emotion/jsx-import'          : 'error',
  '@emotion/no-vanilla'          : 'error',
  '@emotion/import-from-emotion' : 'error',
  '@emotion/styled-import'       : 'error',
};

var rulesForBlueprintJs = {
  '@typescript-eslint/tslint/config'  : ['off'],
  'react/jsx-boolean-value'           : ['warn', 'never'],
  'header/header'                     : ['off'],
  'import/no-extraneous-dependencies' : ['off'],
  'import/no-default-export'          : ['off'],
  'import/order'                      : ['off'],
  'no-duplicate-imports'              : ['off'],
  'no-template-curly-in-string'       : ['off'],
  'sort-imports'                      : ['warn'],
};


var rules = Object.assign(
  {},
  rulesForJs,
  rulesForTypescript,
  rulesForReact,
  rulesForEmotion,
  rulesForBlueprintJs
);

module.exports = {
  'root' : true,
  'env'  : {
    // "jest/globals" : true,
  },
  'extends' : [
    // "plugin:prettier/recommended",
  ],
  'rules'     : rules,
  'overrides' : [
    {
      'files'   : ['*.ts', '*.tsx'],
      'extends' : [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/strict',
        '@blueprintjs/eslint-config',
        // "plugin:prettier/recommended",
      ],
      'parser'        : '@typescript-eslint/parser',
      'parserOptions' : {
        project : path.join(__dirname, 'tsconfig.json'),
      },
      'settings' : {
        'react' : {
          version : 'detect'
        },
        'import/resolver' : {
          typescript : {}
        }
      },
      'rules' : rules,
    },
    {
      files : ['*.js'],
      rules : rules,
    },
    {
      'files'   : ['*.json', '*.json5', '*.jsonc'],
      'extends' : [
        'plugin:jsonc/recommended-with-jsonc',
      ],
      'parser' : 'jsonc-eslint-parser',
    },
    {
      'files'   : ['spec/**'],
      'plugins' : ['jest', '@emotion'],
      'extends' : ['plugin:jest/recommended', 'plugin:jest/style'],
      'rules'   : {
        'jest/prefer-expect-assertions' : 'off',
      },
    },
  ],
  'rules' : rules,
};
