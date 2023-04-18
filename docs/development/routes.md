# Larch API Collections
### Health API
- /healthz/
This API will return the status of the larch service
### Version API
- /api/larch/version/
This API will return the zombienet version and larch version respectively
## Network APIs
### Create Network API
- /api/larch/network/create
This is a POST API. This will use to create a new network. This will return the Network name and the Run ID respectively. This Run ID will use to see the Network Running Output.
### Check Network Status API
- /api/larch/network/status/
This is a GET API. This will use to check the network status of a perticular network. This API will take networkName as a parameter (?networkName=ATestNetwork).
### Display Network Info API
- /api/larch/network/
This is a GET API. This is used to display the network informations like network name, network ID, configuration file name, configuration file, network directory, network provider name, network status, testing zndsl file, test file name and network creation time.
### Test Network API
- /api/larch/network/test/
This GET API takes network name as a parameter and run the network test with the given dsl test file and will return a Run ID.
### Display Network Run Output API
- /api/larch/network/run
After network creation or network testing there lots of process to which we need to keep an eye on. For tracking those output this GET API is used. It will take the run ID as input and show the result on the output.
### Update Network API
- api/larch/network/update/
This is a POST API. To update the configuration file and network directory path and network provider we can use this API.
### Delete Network API
- api/larch/network/update/
To delete a perticular network we can use this API. In this case we can pass the network name as a parameter.
### Listing API
- /api/larch/network/list/
This is a POST API. We can list out network by network name, configuration file name, network provider, network test file name.
### Network Run List API
- /api/larch/network/run-list/
We can also List out network output by their Run ID, intension or command.

## Template APIs
### Create Template
- /api/larch/template/create/

### Get Template Details
- /api/larch/template/

### Update Template
- /api/larch/template/update/

### List Template
- /api/larch/template/list/

### Clone Template
- /api/larch/template/clone/

### Delete Template
- /api/larch/template/delete/

## User Operation APIs
### Get User Operation
- /api/larch/user_operation/

### Purge User Operation
- /api/larch/user_operation/purge/

### User Operation List
- /api/larch/user_operation/list/





