# Development docs

The development is done in a mono repo managed by Lerna.

To execute we have to run `npm run prepare`, then go to `packages/cli` and run `npm run start`

## UI base path

UI base path can be changed by passing environment variable `ASSET_URL` and can be accessed in source by `import.meta.env.BASE_URL` [1].

## References

[1] : [Building for Production | Vite](https://vitejs.dev/guide/build.html#public-base-path)