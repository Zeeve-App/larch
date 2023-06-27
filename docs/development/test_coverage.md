# Testing and code coverage docs 

- To run the test cases present in the application, from the root of the repository run: `npm run test`
- To check the test coverage in the application, from the root of the repository run: `npm run coverage`

The above are to run unit test case and check it's coverage, to perform other required tests follow the given instructions:

## Binary build sanity test

- Do the application build: `npm run build`
- Follow the [Binary build](./binary_build.md) guide to build the application binary
- Go to bins directory, provide execute permission (`chmod 775 BINARY_NAME`)
- Run the binary help: `./larch-linux-x64 --help`
- Check if binary is working by running larch binary: `./larch-linux-x64`
  - Check if UI is opening on browser (`http://localhost:9000`) and versions are present at left bottom corner matching values in (`packages/backend/src/config.ts` and `packages/backend/src/version.ts`)

## Manual sanity test

- To do a simple sanity test on application, we can run the application through either from source or binary
- and run by deleting previously creates networks from `My Network` page and go through [Tutorial](../user/tutorial.md) to check basic functionally is working fine.