function fib(n) {
    var num;
    if (n >= 2) {
        num = fib(n - 1) + fib(n - 2);
    } else {
        num = n;
    }
    return num;
}

console.log( fib(3) );
console.log( fib(7) );