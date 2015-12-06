//У объекта есть свойство className, которое хранит список css класов – слов, разделенных пробелами:
//
//    var obj = {
//        className: 'open menu'
//    };
//Напишите функцию removeClass(obj, cls), которая удаляет класс cls, если он есть:
//
//    removeClass(obj, 'open'); // obj.className='menu'
//removeClass(obj, 'blabla'); // без изменений
//P.S. Дополнительное усложнение. Функция должна корректно обрабатывать дублирование класса в строке:
//
//    obj = {
//        className: 'my menu menu'
//    };
//
//removeClass(obj, 'menu');
//
//console.log( obj.className ); // 'my'
//Лишних пробелов после функции образовываться не должно.

var obj = {
    className: 'open menu menu'
};

function removeClass(obj, cls) {
    var classes = obj.className.split(' ');

    for (var i = 0; i < classes.length; i++) {
        if (classes[i] == cls) {
            classes.splice(i, 1);
            i--;
        }
    }
    obj.className = classes.join(' ');

}

removeClass(obj, 'menu');
removeClass(obj, 'blabla');
console.log(obj.className);