import {networkController, createNetworkController, displayNetworkController, testNetworkController, updateNetworkController} from './api/larch/networks.controller.js'
import {progressController} from './api/larch/progress.controller.js'
import {versionController} from './api/larch/version.controller.js'

export const network = networkController;
export const createNetwork = createNetworkController;
export const displayNetworks = displayNetworkController;
export const testNetwork = testNetworkController;
export const updateNetwork = updateNetworkController;

export const progress = progressController;
export const version = versionController;
