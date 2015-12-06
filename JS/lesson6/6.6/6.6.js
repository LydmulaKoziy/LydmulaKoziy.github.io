//Задание 6 (Уникальные элементы массива)
//Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr (arr — массив строк).
//var strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()' ];
//console.log( unique(strings) ); // кришна, харе, 8-()

function unique(arr) {
    var tempArr = arr.slice().sort();

    for (var i = 1; i < tempArr.length; i++) {
        if (tempArr[i-1] === tempArr[i]) {
            tempArr.splice(i,i+1);
        }
    }
    return tempArr;
}

var strings = ['кришна', 'кришна', 'харе', 'харе', 'харе', 'харе', 'кришна', 'кришна', '8-()' ];

console.log( unique(strings) );