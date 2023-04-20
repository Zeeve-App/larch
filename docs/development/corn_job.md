### networkStatusUpdate function: 
During the network creation process, three network states might occur: creating, running and failed. At the time of creating a network the network state will be 'creating', if the network is created successfully, it will be in the running state, if any problem occurs during the network creation process the network state will be 'failed'. In this case, we have to keep updating the network_state column from the database to get the latest state.  So we use a corn job to update the network after each second. We can get the current network status from `/api/larch/network/status/` API.

```
let mutex = false;
/**
 * A Function to update the network status.
 */
async function networkStatusUpdate() {
  /*
    getAllNetworks() : 
      * to get all the network information at decending create time
  */
  const networkList = await getAllNetworks();
  const networkUpdatePromiseList: Promise<any>[] = [];
  for (let i = 0; i < networkList.length; i++) {
    try {
      /*
        Network():
        * The networkName is passing through the constructor Network and creates a new object named network. 
        * @Constructor
        * @param {string} networkList[i].name - Name of the network one by one in the decending order.
      */
      const network = new Network(networkList[i].name);
      /*
        network.getNetworkState():
        * To get the network state of that perticular network.
      */
      At the time of creating a network the network state will be 'creating'
      // if the network is created successfully, it will be in the running state
      // if any problem occurs during the network creation process the network state will be 'failed'.
      
      if ((await network.getNetworkState()) === 'failed') continue;
      const status = await getLatestStatusCode(networkList[i].name);
      let state: NetworkState = 'failed';
      if (status === null) state = 'creating';
      if (status === 0) state = 'running';
      networkUpdatePromiseList.push(network.updateNetworkStatus(state));
    } catch (error) {
      console.error(error);
    }
  }
  await Promise.allSettled(networkUpdatePromiseList);
}

/*
  startInterval():
  * The startInterval function is acting as a corn job which is updating the network state for the existing network in each second.
*/
function startInterval() {
  if (mutex) return;
  mutex = true;
  setInterval(() => {
    networkStatusUpdate()
      .catch(console.error)
      .finally(() => { mutex = false; });
  }, 1000);
}

startInterval();

