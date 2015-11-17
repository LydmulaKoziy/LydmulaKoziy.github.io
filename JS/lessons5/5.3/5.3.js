var numbers = [];


do {
    var numeric = prompt('Введіть число', '');
    numbers.push(+numeric);
}  while (numeric != '' && numeric != null);


var sum = 0;
for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

alert( sum );

