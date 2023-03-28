# Development docs

The development is done in a mono repo managed by Lerna.

To execute we have to run `npm run prepare`, then go to `packages/cli` and run `npm run start`

## UI base path

UI base path can be changed by passing environment variable `ASSET_URL` and can be accessed in source by `import.meta.env.BASE_URL` [1].

## Lerna

- Visualize packages: `npx nx graph` at any project level
- Build all packages: `npx lerna run build` at any project level
- Prepare the build with UI: from root project directory run `npm run build`
- To run the application: from root project directory run `npm run start`

## References

[1] : [Building for Production | Vite](https://vitejs.dev/guide/build.html#public-base-path)
[2] : [Getting Started | Lerna](https://lerna.js.org/docs/getting-started)