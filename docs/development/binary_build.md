# Binary build docs

For binary build we use `pkg` utility

## Generating binaries

From the root of the repository, perform the following actions:

- Install all packages (`npm i`) and build all the packages (`npm run build`) if not done, then

- Run `npx lerna run package:linux` to build for linux and `npx lerna run package:macos` to build for macos

- Binaries will be generated in `bins` directory in the root of the repository

## References

- [pkg - npm](https://www.npmjs.com/package/pkg)