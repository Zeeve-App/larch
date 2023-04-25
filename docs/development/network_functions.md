### deleteNetwork()
Delete network function is used to `delete` a network from the created network list. It will update the network state to `in-cleanup` and also delete the network directory from the process. At last it deletes all the network run informations from the database.

### createNetwork()
create network function is used to `create` and `run` a new network. The required network information (NetworkInfo) is passed as parameter. In this process it inserts all the network informations into the database and creates a directory as the network name under the network directory. If the testFilename and test config file is given by the user the it will create the directory under the network directory as the test file name convert it to zndsl file from a base64 file.
