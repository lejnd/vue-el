// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
        // windows换行
        "linebreak-style": [0, "windows"],
        // 对象字面量项尾不能有逗号
        "comma-dangle": [0, "never"],
        // 缩进风格
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        // 函数定义时括号前面要不要有空格
        "space-before-function-paren": [0, "always"],
        // 转义字符规则
        'no-useless-escape': 0,
        // 语句强制分号结尾
        "semi": [0, "always"],
        // 换行时操作符放在行尾规则
        "operator-linebreak": 0
    }
}
