// import { podmanCheck } from "./checkPodman.js"
import { cloneRepo } from "./cloneZombienet.js";
// import { directoryIsExist } from "./directoryIsExist.js"

export const startNetwork = async (a:string,b:string|undefined) => {
    try {
        let str1 = a;
        let str2 = b;
        // directoryIsExist(str1,str2)
        cloneRepo (str1,str2);
        // directoryIsExist()
        console.log("Welcome to Zombienet binary")
    } catch (error) {
        console.error(error);
    }
}

// startNetwork();