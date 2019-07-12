function getMin(...numbers) {
    if (numbers.length > 0) {
        let min = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] < min) {
                min = numbers[i];
            }
        }
        return min;
    }
}
console.log(getMin(55, 42, 21, 65));
console.log(getMin(-2, 4, 0, 10));
console.log(getMin(10, 2));
console.log(getMin(100));
console.log(getMin());