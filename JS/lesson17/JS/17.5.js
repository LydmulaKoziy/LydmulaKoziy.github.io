var ul = document.createElement('ul');
document.body.appendChild(ul);
do {
    var item = prompt('Введіть пункт', '');
    if (!item) break;
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
} while (item != null);
