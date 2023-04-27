
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
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
        "react/display-name": "off",
        "import/no-named-as-default": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "off",
        "react/require-default-props": "off",
        "jsx-quotes": ["error", "prefer-single"],
        "max-len": ["error", { "code": 140, "comments": 140, "ignoreString": true }],
        "jsx-a11y/label-has-associated-control": ["error", { assert: "either" } ]
    }
}