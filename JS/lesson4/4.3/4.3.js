var str = prompt('Введіть слово', '');

function checkLong(){

    var m = str.length;
    if(m < 20) {
        console.log(str);
    } else {
        console.log(str.substr(str.length - 20) + '...')
    }
}

checkLong();
