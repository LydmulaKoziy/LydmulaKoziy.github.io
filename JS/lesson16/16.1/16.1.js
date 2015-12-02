var table = document.body.children[0];
for (var i = 0; i < table.rows.length; i++){
    var t = table.rows[i].cells[i];
    t.style.backgroundColor = 'red';
}
