function isPal(string) {
    var name = string.toLowerCase();
    if(name.charAt(0) === name.charAt(name.length-1)){
        return true;
    } else {
        return false;
    }

}
console.log(isPal('Anna'));
console.log(isPal('А роза упала на лапу Азора'));
console.log(isPal('Вася'));
console.log(isPal('12321'));
console.log(isPal('123212'));
