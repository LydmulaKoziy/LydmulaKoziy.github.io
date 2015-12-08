function printNumbersInterval() {
    var i = 1;
    var timerNumber = setInterval(function() {
        console.log(i);
        if (i == 20) clearInterval(timerNumber );
        i++;
    }, 100);
}

printNumbersInterval();
