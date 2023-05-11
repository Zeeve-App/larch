/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

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