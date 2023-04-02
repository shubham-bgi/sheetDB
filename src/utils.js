function checkKeys(obj, arr){
    for(let i = 0; i < arr.length; i++) {
        if(!obj[arr[i]]) return arr[i];
    }
}