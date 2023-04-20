# Welcome to Larch
## How to use the Larch-Cli
In this guilde you will know about the usage of the Larch-Cli. The Larch-Cli is for managing polkadot parachain configuration
API only mode and UI only mode
- Pass disable UI or API flags, both can't be disabled at same time. Both are enabled by default
- UI and API will be have common endpoint, routes will be different
- `/ui` for UI components
- `/api` for Backend API's 

``
Options:
  -V, --version          output the version number
  --disable-ui           Disable Frontend
  --disable-api          Disable Backend
  --service-port <port>  Larch service HTTP listen port (default: "9000")
  -h, --help             display help for command