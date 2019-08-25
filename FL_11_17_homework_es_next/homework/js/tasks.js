const maxElement = arrElements => Math.max(...arrElements); //task1
const copyArray = array => [...array]; //task2
const addUniqueId = object => { //task3
    try {
        return { ...object, id: Symbol() };
    }
    catch {
        return Object.assign({}, object, { id: Symbol('id') });
    }
};
const regroupObject = ({ name: firstName, details: { id, age, university } } = {}) => { //task4
    return { university, user: { age, firstName, id } };
};
const findUniqueElements = arr => [...new Set(arr)]; //task5

const hideNumber = number => number.length > 4 ?  //task6
    number.slice(number.length - 4).padStart(number.length, '*')
    : number;

const require = () => { throw new Error('Parametr has not been declared'); };
const add = (a = require(), b = require()) => a + b; //task7

const sorter = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    } else if (nameA > nameB) {
        return 1;
    }
    return 0;
};

const typeNames = (url) => { //task8
    fetch(url)
        .then(request => request.text())
        .then(text => JSON.parse(text))
        .then(arr => arr.sort(sorter))
        .then(arr => {
            console.log(`
        Names: 
        `);
            arr.forEach(element => {
                console.log(element.name);
            });
        }
        )
        .catch(() => { throw new Error('Parsing went wrong'); });
};

const typeNamesAsync = async (url) => { //task9
    try {
        const responce = await fetch(url);
        const text = await responce.text();
        const names = await JSON.parse(text);
        console.log(`
      Names: 
      `);
        await names.sort(sorter).forEach(element => {
            console.log(element.name);
        });
    } catch (err) {
        console.error('Error in parsing data!' + err.stack);
    }
};


const arr = [1, 2, 3, 4, 56, 7, 8, 76, 5, 241, 5, 356, 567, 2];
console.log(maxElement(arr));

const arr1 = [1, 2, 3];
const copiedArr = copyArray(arr1);
console.log(arr1, copiedArr);
console.log(arr1 === copiedArr);

const obj1 = { name: 123 };
const obj2 = addUniqueId(obj1);
console.log(obj1);
console.log(obj2);

const oldObj = {
    name: 'Someone', details: {
        id: 1, age: 11, university: 'UNI'
    }
};
console.log(oldObj);
console.log(regroupObject(oldObj));

const arr5 = [1, 2, 2, 1, 4, 4, 1, 5, 2];
console.log(findUniqueElements(arr5));

const phoneNumber = '0123456789';
console.log(hideNumber(phoneNumber));

console.log(add(1, 4));
//console.log(add(1));

const dataSource = 'https://jsonplaceholder.typicode.com/users';
typeNames(dataSource);
typeNamesAsync(dataSource);