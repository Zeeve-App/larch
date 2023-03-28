module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript"
    ],
    "overrides": [],
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module",
        tsconfigRootDir: __dirname,
    },
    "ignorePatterns": ".eslintrc.cjs",
    "rules": {
        "no-console": "off"
    }
}