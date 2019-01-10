export const objectCompare = (objA, objB) => {
    for(let key in objA) {
        if (Array.isArray(objA[key])) {
            if (JSON.stringify(objA[key]) !== JSON.stringify(objB[key]))
                return false;
        }
        else if (Object.keys(objA[key]).length > 1) {
            for (let subKey in objA[key]) {
                if (objA[key][subKey] !== objB[key][subKey])
                    return false;
            };
        }
        else {
            if (objA[key] !== objB[key])
                return false;
        };
    };
    return true;
};

export const arrayCompare = (arrA, arrB) => {
    let returnVal = true;
    arrA.forEach((element, ix) => {
        if (!objectCompare(element, arrB[ix]))
            returnVal = false;
    });
    return returnVal;
};
