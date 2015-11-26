function pow(x, n) {
    var resault = x;
    for (var i = 1; i < n; i++){
        resault *= x;
    } console.log(resault);
}

pow(2, 3);
