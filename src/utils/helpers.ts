export function compareArrays(array1, array2) {
    if(!array1 || !array2) {
        return false;
    }

    // // if(array1.length !== array2.length) {
    // //     return false;
    // // }

    // for(let x = 0; x < array1.length; x++) {
    //     if(array1[x] !== array2[x]) {
    //         return false;
    //     }
    // }


    for(let prop of array2) {
        if(array1.indexOf(prop) == -1) {
            return false;
        }   
    }


    /**
     * Before return true
     */
    for(let prop of array1) {
        if(array2.indexOf(prop) == -1) {
            delete array1[prop];
        }   
    }

    return true;
}