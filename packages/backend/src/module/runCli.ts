import { startBackend, options } from "./larch.js";


export const runCli = async () => {

    if (options.disableUi && options.disableApi){
        console.log("You cannot disable UI and API at the same time")
    }
    else if (options.disableUi) {
        console.log("UI disabled");
        console.log("Starting Api Services")
        startBackend();
    }
    
    else if (options.disableApi) {
        console.log("API disabled")
        console.log("Starting UI Servieces")
        // startFrontend()
    }
    else if (!(options.disableUi && options.disableApi)){
        console.log("Starting both Backend and Frontend")
        // startBackend()
        // startFrontend()
    }
}
