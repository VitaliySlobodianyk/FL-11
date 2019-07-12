function addOne(x) {
  return x + 1;
}
function pipe(number, ...functions) {
  for (const iterator of functions) {
    number = iterator(number);
  }
  return number;
}
console.log(pipe(1, addOne));//=> 2
console.log(pipe(1, addOne, addOne)); //=> 3
console.log(pipe(1, addOne, addOne, addOne, addOne));//=> 5
console.log(pipe(1));//=> 1