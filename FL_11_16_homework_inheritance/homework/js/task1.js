const assign = function (target, ...varArgs) {
    if (target === null || target === undefined) {
       console.error('Error! Target is not defined');
    }
    let to = Object(target);
    for (const iterator of varArgs) {
        let nextSource = iterator;
        if (nextSource !== null && nextSource !== undefined) {
            for (let nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
};
const defaults = { a: 123, b: 777 };
const options = { a: 456 };
const configs = assign({}, defaults, options);// => {a: 456, b: 777}
console.log(configs);