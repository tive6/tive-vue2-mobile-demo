/*
 * @Author: your name
 * @Date: 2021-01-27 15:16:46
 * @LastEditTime: 2021-02-02 19:17:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yc-dlpt-fe/.eslintrc.js
 */
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint', // 词法解析器使用babel-eslint，以更好的适配es6的新api
    /* 启用 ES6 语法支持;默认设置为3，5（默认）， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。
    * 你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）
    */
    ecmaVersion: 8,
    sourceType: 'module', // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'], // default @ -> ./src alias in Vue, it exists even if vue.config.js is not present
        ],
        extensions: ['.json', '.js', '.vue'],
      },
    },
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:vue/recommended'],
  plugins: ['vue', 'import'],
  rules: {
    'import/order': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-duplicates': 0,
    'import/named': 0,
    'import/no-useless-path-segments': 0,
    'import/no-cycle': 0,
    'import/no-self-import': 0,
    'import/no-unresolved': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'max-len': ['error', { code: 180 }],
    'no-param-reassign': ['error', { props: false }],
    'global-require': 0,
    'array-callback-return': 0,
    'no-restricted-globals': 0,
    'use-isnan': 2,
    'padded-blocks': ['error', 'never'],
    'linebreak-style': ['error', (process.platform === 'win32' ? 'windows' : 'unix')],
    'generator-star-spacing': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }], // 没有使用的参数，不会报错。因为个人觉的把可用的参数写上去 有利于以后的维护。
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'array-element-newline': ['error', { multiline: true }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: {
          max: 3,
          // 第一个属性不用换行：必须换行（目前和 prettier 冲突，prettier 会强制
          // 换行）
          allowFirstLine: true,
        },
      },
    ],
    'vue/no-unused-components': ['error',
      {
        ignoreWhenBindingPresent: true,
      }],
    'vue/html-closing-bracket-newline': ['error',
      {
        singleline: 'never',
        multiline: 'never',
      }],
    'vue/max-len': ['error', { code: 180 }],
    'vue/multiline-html-element-content-newline': ['error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
        allowEmptyLines: false,
      }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/singleline-html-element-content-newline': 'off',
      },
    },
  ],
};
