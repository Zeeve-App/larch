import { startNetwork } from "./startNetwork.js";

export const initializeService = async (dirName:string,fileName:string,networkName:string,confFile:string) => {

    try {
        await startNetwork(dirName,fileName,networkName,confFile);
        
    } catch (error) {
        
    }

    // await startNetwork(dirName,fileName,networkName,confFile)
}

