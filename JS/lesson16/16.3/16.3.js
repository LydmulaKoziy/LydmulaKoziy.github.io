//Есть дерево из тегов <ul>/<li>.
//Напишите код, который для каждого элемента <li> выведет:

//1. Текст непосредственно в нём (без подразделов).
//2. Количество вложенных в него элементов <li> — всех, с учётом вложенных.
var elem = document.querySelectorAll('ul > li');
for (var i = 0; i < elem.length; i++) {
    var firstElement =  elem[i].firstChild.data;
    var quantityElem =  elem[i].querySelectorAll('li').length;
    console.log(firstElement + ':' + quantityElem);
}


