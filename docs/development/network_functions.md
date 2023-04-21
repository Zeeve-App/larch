### deleteNetwork()
Delete network function is used to delete a network from the created network list.
export const deleteNetwork = async (
  networkName: string,
): Promise<void> => {
```
  /*
    Network():
    * The networkName is passing through the constructor Network and creates a new object named network. 
    * @Constructor
    network.exists(): 
    * This function  will check the network already exists or not. 
    * If the network doesn't exists it will throw an error.
  */
  const network = new Network(networkName);
  const networkExists = await network.exists();
  if (!networkExists) {
    throw new AppError({
      kind: 'NETWORK_NOT_FOUND',
      message: `Network with network name ${networkName} does not exists`,
    });
  }
  /*
    updateStatus(): 
      * @param {string} in-cleanup' - Represents the network state.
      * function update the network state to 'in-cleanup'.
    network.get(): 
      * function will return all the network information as result.
      getNetworkPath(): 
      * @param {string} networkInfo.name : The Network name.
      * Function will return network directory path with network name.
    removeInProgressNetwork():
      * @param {string} networkInfo.name : The Network name.
      * Removes the network state from the database.
  */
  await network.updateStatus('in-cleanup');
  const networkInfo = await network.get();
  const networkPath = getNetworkPath(networkInfo.name);
  removeInProgressNetwork(networkInfo.name);
  /*
    deleteDir(): take networkPath as parameter and delete the directory if exists.
    networkCleanUp(): 
    * deletes all the pods created during the process.
    * @param {string} networkInfo.networkProvider : The Network provider.
    * @param {string} networkInfo.name : The Network name.
  */
  if (await checkPathExists(networkPath)) await deleteDir(networkPath);
  if (await checkPathExists(networkInfo.networkDirectory)) {
    await networkCleanUp(
      networkInfo.networkProvider,
      networkInfo.name,
      networkInfo.networkDirectory,
    );
    try {
      await deleteDir(networkInfo.networkDirectory);
  ```
      /*
        deleteDirUnshare(): 
        * deletes all the namespaces for that network.
        * @param {string} nnetworkInfo.networkDirectory : network directory name.
        * @param {string} networkInfo.name : The Network name.
      */
  ```
    } catch (error) {
      if (networkInfo.networkProvider === 'podman') {
        await deleteDirUnshare(networkInfo.networkDirectory, networkInfo.name);
      }
    }
  }

  /*
    removeAllExecRunByRelatedId(): 
      * Deletes all the network information regarding that network.
      * @param {string} networkInfo.name : The Network name.
    network.remove(): 
      * Deletes all the network information regarding that network from the database.
  */

  await removeAllExecRunByRelatedId(networkInfo.name);
  await network.remove();
};
``` 

### createNetwork()
create network function is used to create a new network. The required network information (NetworkInfo) is passed as parameter.
export const createNetwork = async (networkInfo: NetworkInfo): Promise<{
  name: string; runId: string;
}> => {
  /*
    ExecRun():
    * creates a object named runInfo.
    * @Constructor
    Network(): 
    * networkName from the object networkInfo is passed through the constructor Network and creates a new object named network. 
    * @Constructor
    network.exists(): This function  will check the network already exists or not. 
    If the network doesn't exists it will throw an error.
  */

  const runInfo = new ExecRun();
  const network = new Network(networkInfo.name);
  const networkExists = await network.exists();
  if (networkExists) {
    throw new AppError({
      kind: 'NETWORK_EXISTS',
      message: `Network with network name ${networkInfo.name} already exists`,
    });
  }
  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkInfo.name}`;
  const networkConfigPath = `${networkDirPath}/${networkInfo.configFilename}`;

  /*
    network.set(): This function insert the the network informations into the database.
    createDir(): This creates the directory in that perticular path.

  */

  try {
    await network.set({ ...networkInfo, networkState: 'creating' });
    await createDir(networkDirPath);
    await createDir(networkInfo.networkDirectory);
    await writeToFileFromBase64(networkConfigPath, networkInfo.configContent);
   
  /*
      If the testFilename and test config file is given by the user the it will create the directory under the network directory as the test file name convert it to zndsl file from a base64 file.
  */

    if (networkInfo.testFilename && networkInfo.testContent) {
      const networkTestConfigPath = `${networkDirPath}/${networkInfo.testFilename}`;
      await writeToFileFromBase64(networkTestConfigPath, networkInfo.testContent);
    }
  } catch (error) {
    await network.set({ ...networkInfo, networkState: 'failed' });
    throw new AppError({
      kind: 'NETWORK_DIR_CREATE_ERROR',
      message: `Network dir creation error with network name ${networkInfo.name}`,
    });
  }
```
  /*
  runZombienet(): This function is responsible for running the network.
    * @param {boolean} spawn - If the user has coosen to create and run the network the spawn value will be true.
    * @param {string} networkConfigPath - Represents the network configuration path.
    * @param {string} provider - If the provider is given by the user then it will pass that or it will pass the default provider Podman.
    * @param {string} ZOMBIENET_VERSION - The latest zombienet version or the version passed by the user.
    * @param {string} runInfo.id - The run id.
    * @param {string} networkInfo.name - Network name.
    
  */

  await runZombienet({
    spawn: true,
    networkConfigPath: `${networkDirPath}/${networkInfo.configFilename}`,
    // @ts-ignore
    provider: networkInfo.networkProvider ?? LARCH_DEFAULT_PROVIDER_NAME,
    dir: networkInfo.networkDirectory,
  }, ZOMBIENET_VERSION, runInfo.id, networkInfo.name);

  return {
    name: networkInfo.name,
    runId: runInfo.id,
  };
};
```

### testNetwork()
```
export const testNetwork = async (networkName: string): Promise<{
  name: string; runId: string;
}> => {

  /*
    ExecRun():
    * creates a object named runInfo.
    * @Constructor
    Network(): 
    * networkName from the object networkInfo is passed through the constructor Network and creates a new object named network. 
    * @Constructor
    network.exists(): This function  will check the network already exists or not. 
    If the network doesn't exists it will throw an error.
  */

  const runInfo = new ExecRun();
  const network = new Network(networkName);
  const networkExists = await network.exists();

  if (!networkExists) {
    throw new AppError({
      kind: 'NETWORK_NOT_FOUND',
      message: `Network with network name ${networkName} does not exists`,
    });
  }
  const networkInfo = await network.get();
  const networkDirPath = `${ZOMBIENET_NETWORKS_COLLECTION_DIR}/${networkInfo.name}`;
```
   /*
  runZombienet(): This function is responsible for running the network.
    * @param {boolean} test - If the user has coosen to test the network the test value will be true.
    * @param {string} testConfigPath - Represents the test configuration path.
    * @param {string} provider - If the provider is given by the user then it will pass that or it will pass the default provider Podman.
    * @param {string} ZOMBIENET_VERSION - The latest zombienet version or the version passed by the user.
    * @param {string} runInfo.id - The run id.
    * @param {string} networkInfo.name - Name of the network to test.
    
  */
```
```

  await runZombienet({
    test: true,
    testConfigPath: `${networkDirPath}/${networkInfo.testFilename}`,
    // @ts-ignore
    provider: networkInfo.networkProvider ?? LARCH_DEFAULT_PROVIDER_NAME,
  }, ZOMBIENET_VERSION, runInfo.id, networkName);

  return {
    name: networkInfo.name,
    runId: runInfo.id,
  };
};
```
```