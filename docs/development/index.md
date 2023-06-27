# Development docs

The development is done in a mono repo managed by Lerna.

## Dependencies

To prepare the project for development we require few dependencies

- `nodejs` > v18.x & `npm` > 9.x
- `podman` for running and testing Zombienet

## Process

- In the root directory of repository run `npm i` to install dependencies
- Then to do build of the application run `npm run build`
- Finally to execute the application run `npm run start`, this start service

## Services and Packages detailed info.

- [Backend](./backend.md)
- [GUI](./gui.md)
- [CLI](./cli.md)

## UI base path

UI base path can be changed by passing environment variable `ASSET_URL` and can be accessed in source by `import.meta.env.BASE_URL` [1].

## Lerna

- Visualize packages: `npx nx graph` at any project level
- Build all packages: `npx lerna run build` at any project level
- Prepare the build with UI: from root project directory run `npm run build`
- To run the application: from root project directory run `npm run start`
- in project root run this command to get packages and dependencies graph visualization: `npx nx graph`

## Other links

- [Binary Build](./binary_build.md)
- [Debian Package](./deb_package.md)
- [SystemD service](./larch_service.md)
- [Testing and code coverage](./test_coverage.md)
- [Postman Collections](../Postman-Collections/)

## References

[1] : [Building for Production | Vite](https://vitejs.dev/guide/build.html#public-base-path)

[2] : [Getting Started | Lerna](https://lerna.js.org/docs/getting-started)

[3] : [Podman Ubuntu issue](https://bugs.launchpad.net/ubuntu/+source/libpod/+bug/2024394)