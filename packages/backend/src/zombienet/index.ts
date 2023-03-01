// import { podmanCheck } from "./checkPodman.js"

import { directoryIsExist } from "./directoryIsExist.js"

export const startNetwork = async (a:string,b:string|undefined) => {
    try {
        let str1 = a;
        let str2 = b;
        directoryIsExist(str1,str2)
        console.log("Welcome to Zombienet binary")
    } catch (error) {
        
    }
}

// startNetwork();