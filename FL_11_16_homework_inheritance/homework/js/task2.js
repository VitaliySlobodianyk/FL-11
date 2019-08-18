const create = function (proto, propertiesObject) {
    const F = function () {
        //
    };
    F.prototype = proto;
    if (propertiesObject && typeof propertiesObject === 'object') {
        return Object.assign(new F(), propertiesObject);
    }
    return new F();
};
const obj1 = { prop: 5 };
const obj2 = create(obj1);
console.log(obj2);
console.log(Object.getPrototypeOf(obj2) === obj1); // => true
console.log(obj2.prop); // => 5

