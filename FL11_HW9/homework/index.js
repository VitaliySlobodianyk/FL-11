let getNumbers = function (string) {
    let numbers = [];
    for (let i = 0; i < string.length; i++) {
        if (!isNaN(Number(string[i]))) {
            numbers.push(string[i]);
        }
    }
    return numbers;
};
// console.log(getNumbers('string')); // returns [] 
// console.log(getNumbers('n1um3ber95')); // returns [1,3,9,5] 
// console.log(getNumbers('0132'));

let findTypes = function (...types) {
    let typesObj = {};
    for (const element of types) {
        let type = typeof element;
        if (type in typesObj) {
            typesObj[type]++;
        } else {
            typesObj[type] = 1;
        }
    }
    return typesObj;
};
// console.log(findTypes('number')); // returns {“string”:1} 
// console.log(findTypes(null, {}, 1, 'hello', 'bye')); // returns {“object”:1, “number”:1, “string”:1}
// console.log(findTypes([]));

let executeforEach = function (array, callback) {
    for (let i = 0; i < array.length; i++) {
        callback(array[i], i);
    }
};
// executeforEach([1, 2, 3], function (el) {
//     console.log(el);
// }); // logs 1 2 3

let mapArray = function (array, callback) {
    executeforEach(array, function (elem, position) {
        array[position] = callback(elem);
    });
    return array;
};
// console.log(mapArray([2, 5, 8], function (el) {
//     return el + 3;
// })); // returns [5, 8, 11]

let filterArray = function (array, callback) {
    let outArray = [];
    executeforEach(array, function (elem) {
        if (callback(elem)) {
            outArray.push(elem);
        }
    });
    return outArray;
};
// console.log(filterArray([2, 5, 8], function (el) {
//     return el > 3;
// })); // returns [5, 8]

let showFormattedDate = function (date) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Date: ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
};
// console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));
        // returns ‘Date: Jan 27 2019’
        // every month should be showed as 3 letters (e.g. Feb, Apr or Dec)

let canConvertToDate = function (date) {
    return !isNaN(Date.parse(date));
};
// console.log(canConvertToDate('2016-13-18T00:00:00')); // false
// console.log(canConvertToDate('2016-03-18T00:00:00')); // true
// console.log(canConvertToDate('2016-03-33T00:00:00'));

let daysBetween = function (date1, date2) {
    const timeSequence = {
        milisecondsInSecond: 1000,
        secondsInMinute: 60,
        minutesInHour: 60,
        hoursInDay: 24
    };
    let amountOfMiliseconds = Date.parse(date2) - Date.parse(date1);
    for (const element in timeSequence) {
        if (timeSequence.hasOwnProperty(element)) {
            amountOfMiliseconds /= timeSequence[element];
        }
    }
    return Math.abs(Math.round(amountOfMiliseconds));
};
// console.log(daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00'))); // 32
// console.log(daysBetween(new Date('2000-02-08T00:00:00'), new Date('2019-07-12T00:00:00')));

let data =[
    {
      '_id': '5b5e3168c6bf40f2c1235cd6',
      'index': 0,
      ' birthday ': '2016-03-18T00:00:00',
      'eyeColor': 'green',
      'name': 'Stein',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e3168e328c0d72e4f27d8',
      'index': 1,
      ' birthday ': '1991-02-11T00:00:00',
      'eyeColor': 'blue',
      'name': 'Cortez',
      'favoriteFruit': 'strawberry'
    },
    {
      '_id': '5b5e3168cc79132b631c666a',
      'index': 2,
      ' birthday ': '1984-04-17T00:00:00',
      'eyeColor': 'blue',
      'name': 'Suzette',
      'favoriteFruit': 'apple'
    },
    {
      '_id': '5b5e31682093adcc6cd0dde5',
      'index': 3,
      ' birthday ': '1994-04-17T00:00:00',
      'eyeColor': 'green',
      'name': 'George',
      'favoriteFruit': 'banana'
    }
  ];

  let getAmountOfAdultPeople= function(people){
   return filterArray(people,function(person){
       let adult =18;
       let daysInYear=365;
       let intercalaryYear={
            days:366,
            divBy100:100,
            divBy400:400,
            divBy4:4
       };
       let days =daysBetween(person[' birthday '],new Date());
       let years=0;
      for(let start = new Date(person[' birthday ']).getFullYear(); 
      start<=new Date().getFullYear()&& days -daysInYear >0;
      start++){
          if(start%intercalaryYear.divBy100!==0&&
            (start%intercalaryYear.divBy400===0||start%intercalaryYear.divBy4===0)){
                days-=intercalaryYear.days;
          }else{
            days-=daysInYear;
          }
          years++;
      }           
       return years>=adult;
   }).length;
  };
// console.log(getAmountOfAdultPeople(data)); // returns 3;

let keys = function(object){
    let keys =[];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key);        
      }
  }
  return keys;
};
// console.log(keys({keyOne: 1, keyTwo: 2, keyThree: 3})); // returns [“keyOne”, “keyTwo”, “keyThree”]

let values = function(object){
    let values =[];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        values.push(object[key]);        
      }
  }
  return values;
};
// console.log(values({keyOne: 1, keyTwo: 2, keyThree: 3})); // returns [1, 2, 3]