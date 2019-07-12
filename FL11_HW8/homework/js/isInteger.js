function isInteger(number) {
    return (number * 10) % 10 === 0;
}
console.log(isInteger(-3));
console.log(isInteger(2.0));
console.log(isInteger(3.35));
console.log(isInteger(-1.07002));
console.log(isInteger(0.001));
console.log(isInteger(0));