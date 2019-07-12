function reverseNumber(number) {
  if (number !== undefined && number !== null) {
    let tmp = 0;
    while (number) {
      tmp *= 10;
      tmp += number % 10;
      number = parseInt(number / 10);
    }
    return tmp;
  }
}
console.log(reverseNumber(5132));
console.log(reverseNumber(-321));
console.log(reverseNumber(1000));
console.log(reverseNumber(101));
console.log(reverseNumber(0));
console.log(reverseNumber('abcd'));
console.log(reverseNumber());

