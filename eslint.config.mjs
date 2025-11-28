// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import yamlParser from 'yaml-eslint-parser'

export default antfu({
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    rules: {
        'no-console': 'off',
        'unused-imports/no-unused-vars': 'off',
        'style/no-tabs': 'off',
    },
}, {
    files: ['**/*.yml', '**/*.yaml'],
    languageOptions: {
        parser: yamlParser,
    },
    rules: {
        'yaml/indent': ['error', 2],
    },
})
