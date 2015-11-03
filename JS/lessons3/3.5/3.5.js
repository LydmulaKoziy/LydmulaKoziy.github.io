function checkBox(size) {
    for (var i = 1; i <= size; i++) {
        var line = ' ';
        for (var j = 1; j <= size; j++){
            if(i % 2 == 0){
                if(j % 2 == 0) {
                    line += '#';
                } else {
                    line += ' ';
                }
            } else {
                if(j % 2 == 0) {
                    line += ' ';
                } else {
                    line += '#';
                }
            }
        }
        console.log(line);
    }
}

checkBox(8);
