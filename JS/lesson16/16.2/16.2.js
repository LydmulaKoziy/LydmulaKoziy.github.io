//1. Все элементы label внутри таблицы. Должно быть 3 элемента.

var elem = document.getElementById('age-table').getElementsByTagName('label');
console.log(elem);
console.log(elem.length);


//2. Первую ячейку таблицы (со словом "Возраст").

var age = document.getElementById('age-table').getElementsByTagName('td')[0];
console.log(age.innerHTML);

//3. Вторую форму в документе

var secondForm = document.getElementsByTagName('form')[1];
console.log(secondForm);

//4. Форму с именем search, без использования её позиции в документе.

var getNameForm = document.getElementsByName('search');
console.log(getNameForm);

var getNameForm1 = document.querySelector('form[name="search"]');
console.log(getNameForm1);

//5. Элемент input в форме с именем search. Если их несколько, то нужен первый.

var getInput = document.querySelector('form[name="search"] input');
console.log(getInput);

//6. Элемент с именем info[0], без точного знания его позиции в документе.

var element = document.getElementsByName(' info[0]');
console.log(element);

//7. Элемент с именем info[0], внутри формы с именем search-person.
var getName = document.querySelector('form[name = "search-person"] [name = info[0]');
console.log(getName);