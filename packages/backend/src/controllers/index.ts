import {networkController, createNetworkController, displayNetworkController, testNetworkController} from './api/larch/networks.controller.js'
import {progressController} from './api/larch/progress.controller.js'
import {versionController} from './api/larch/version.controller.js'
import {healthController} from './health/health.controller.js'

export const network = networkController;
export const createNetwork = createNetworkController;
export const displayNetworks = displayNetworkController;
export const testNetwork = testNetworkController;

export const progress = progressController;
export const version = versionController;
export const health = healthController;

