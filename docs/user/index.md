# User Guides

## Motivation and Utility of Larch application

Larch application is built to help ease the Zombienet network creation and network testing process, Zombienet is a CLI application and configurations has to be built in a specific manner and in specific serialization format, Larch is a UI utility to create these configurations and invoke the Zombienet service and manage it all from the GUI.

## How to use the Larch service

In this guide you will know about the usage of the Larch service. The Larch service is for managing polkadot Zombienet based configurations and service. 

## Help

- `larch --help`

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

- Start the service: `larch`
- **Note**: `you can disable UI or API, both can't be disabled at same time. Both are enabled by default`

## Service Endpoint

Service endpoint in the application is to point any Larch service endpoint which is accessible from the client machine (Browser), the utility of this feature is to manage multiple Larch services without leaving the tab by just changing the endpoint.

- `Default` button is used to revert to Larch UI serving endpoint
- `Reset` button is used when changes are done in input box, but don't want to save and revert to current endpoint
- `Save` button will save the endpoint for the application

**Note**: Endpoint changes persists relaunch of the browser

## Pages

- **Dashboard** : contains the links to pages with basic description and number of elements present regarding the page context
- **My Networks** : List of network that are generated for either testing or evaluation purposes
- **Templates** : List of templates created by Network Template create functionality (button at top right)
- **Executions** : List the set of execution info related to network creation
- **Activity** : records of user activity
- **Documentation**: User documentation

## Listing of records

Listing of the records are done for network, network templates, executions and activity records.

All of them have common functionality as listed below

- **Filter**
  - Select a specific field and enter the value and apply the filter to take effect
  - use clear button when you want to clear all the filters being applied, a specific filter can also be removed by clicking (x) symbol beside the field filter
  - A pre applied field can be edited by clicking the field bubble and click apply filter again to take effect.
- **Refresh**
  - Updates the records list from the backend if there is a change with the given filter and page number
- **Pagination**
  - Page can be selected, and also changed by 1 page using left or right buttons

## Additional Links

- [Network template](./network-template.md)
- [Network and Executions](./network-and-exec.md)