
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "eslint:recommended",
    ],
    "overrides": [],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "project": "./tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module",
        "tsconfigRootDir": __dirname,
    },
    "ignorePatterns": ".eslintrc.cjs",
    "rules": {
        "no-console": "off",
        "no-bitwise": "off",
        "no-plusplus": "off",
        "import/no-named-as-default": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-quotes": ["error", "prefer-single"],
        "max-len": ["error", { "code": 120, "comments": 120 }],
        "jsx-a11y/label-has-associated-control": ["error", { assert: "either" } ]
    }
}