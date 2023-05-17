# <img alt="Larch Dashboard" src="./docs/assets/logo.svg" width="25em"/> Larch

A GUI for Substrate / Polkadot Zombienet application

<img alt="Larch Dashboard" src="./docs/assets/larch-dashboard.png" width="100%"/>

## Usage

- Execute following commands to start Larch
  - `npm i`
  - `npm run build`
  - `npm run start`
- Application will be started on Port 9000 (Default), to view UI then go the browser and navigate to `http://localhost:9000`.

### Help

- `npm run start -- --help` or `./larch --help`

```
Welcome to Larch
Usage: larch [options]

GUI Application for managing Zombienet

Options:
  -V, --version          output the version number
  --disable-ui           Disable Frontend
  --disable-api          Disable Backend
  --service-port <port>  Larch service HTTP listen port (default: "9000")
  -h, --help             display help for command
```

## Additional information

### Docs

- [Docs](/docs)

## License

- Larch application source is licensed under GNU GPLv3 [license](./license)

## References:

- [paritytech/zombienet: A cli tool to easily spawn ephemeral Polkadot/Substrate networks and perform tests against them.](https://github.com/paritytech/zombienet)
