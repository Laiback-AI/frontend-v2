module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'next/core-web-vitals',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier', 'react'],
    rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-prototype-builtins': 'off',
        'no-case-declarations': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['node_modules/', 'public/pdf.worker.min.js'],
    overrides: [
        {
            files: ['*.min.js'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
                'no-undef': 'off',
                'no-unused-vars': 'off',
                'no-case-declarations': 'off',
                'no-prototype-builtins': 'off',
            },
        },
    ],
};
