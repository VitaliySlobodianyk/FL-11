let a, b, c;
a = Number(prompt('Enter A side of triangle:', ''));
b = Number(prompt('Enter B side of triangle:', ''));
c = Number(prompt('Enter C side of triangle:', ''));
if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0 ||
    (a + b < c || a + c < b || c + b < a)) {
    console.log('Triangle doesn’t exist');
} else {
    if (a === b && a === c && b === c) {
        console.log('Equvivalent triangle');
    } else if (a === b || a === c || b === c) {
        console.log('Isosceles triangle');
    } else {
        console.log('Normal triangle');
    }
}