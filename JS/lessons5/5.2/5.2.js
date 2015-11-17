
var image = {
    width: 100,
    height: 400,
    title: 'Cool image'
};

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function multiplyNumeric(image){
    for(var key in image){
        if(isNumeric(image[key])){
            image[key] *= 2;
        }
    }
}
multiplyNumeric(image);
console.log(image);