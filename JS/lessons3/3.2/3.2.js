//function count() {
//    for(var i = 0; i < 3; i++) {
//        var j = i * 2;
//    }
//    console.log(i);
//}
out: for (var i = 2; i < 10; i++) {
    for (var j = 2; j < i; j++){
        if(i % j == 0) {
            continue out;
        }
    }
    alert(i);
}