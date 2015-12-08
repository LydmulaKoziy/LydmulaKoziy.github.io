function printNumbersInterval() {
    var i = 1;
    var timerNumber = setTimeout(function printNumbers() {
        console.log(i);
        if (i < 20) setTimeout(printNumbers, 100);
        i++;
    }, 100);
}

printNumbersInterval();
