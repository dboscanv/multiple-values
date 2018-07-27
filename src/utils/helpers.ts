export function compareArrays(array1, array2) {
    if(!array1 || !array2) {
        return false;
    }

    if(array1.length !== array2.length) {
        return false;
    }

    for(let x = 0; x < array1.length; x++) {
        if(array1[x] !== array2[x]) {
            return false;
        }
    }

    return true;
}