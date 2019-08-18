const Hamburger = function (type, calories, addSecretIngredient = false) {
    let cheeseAdded = 1;
    let tomatoQuant = 2;
    let secretIngredient = 0;
    let beaten = 0;
    this.type = type;
    this.getCalories = function () {
        return calories;
    };
    this.setCalories = function (amount) {
        calories = amount;
    };
    this.addCheese = function () {
        if (!beaten) {
            if (cheeseAdded > 0) {
                this.setCalories(this.getCalories() + 120);
                if(secretIngredient===0){
                    secretIngredient = -1;
                }
                cheeseAdded--;
            } else {
                console.log('Sorry,you can add chese only once!');
            }
        } else {
            console.log('Sorry,you can\'t add chese!');
        }
    };
    this.addTomato = function () {
        if (!beaten) {
            if (tomatoQuant > 0) {
                this.setCalories(this.getCalories() + 20);
                tomatoQuant--;
                if(secretIngredient===0){
                    secretIngredient = -1;
                }
            } else {
                console.log('Sorry, you can add tomatoes only twice!');
            }
        } else {
            console.log('Sorry, you can\'t add tomato!');
        }
    };
    this.addSecretIngredient = function () {
        if (!beaten) {
            if (secretIngredient === 0) {
                this.setCalories(this.getCalories() + 100);
                secretIngredient = 1;
            } else if (secretIngredient === -1) {
                console.log('Sorry, you can add secret ingredient only before another ingredient!');
            } else {
                console.log('Sorry, you can add secret ingredient only once!');
            }
        } else {
            console.log('Sorry, you can\'t add secret ingredient !');
        }
    };
    if (addSecretIngredient) {
        this.addSecretIngredient();
    }
    this.bite = function () {
        beaten++;
    };
    this.info = function () {
        let msg = '';
        if (typeof this.type === 'string' && this.type.length > 0) {
            msg += `${this.type[0].toUpperCase() + this.type.slice(1)} hamburger: `;
        } else {
            msg += 'Unknown hamburger: ';
        }
        if (secretIngredient > 0) {
            msg += 'with secret ingredient, ';
        } else {
            msg += 'without secret ingredient, ';
        }
        if (cheeseAdded === 0) {
            msg += 'with cheese, ';
        } else {
            msg += 'without cheese, ';
        }
        if (tomatoQuant < 2) {
            if (2 - tomatoQuant > 1) {
                msg += `with ${2 - tomatoQuant} tomatoes, `;
            } else {
                msg += `with one tomato, `;
            }
        } else {
            msg += `without tomatoes, `;
        }
        if (beaten > 1) {
            msg += `is bit ${beaten} times `;
        } else if (beaten === 1) {
            msg += `is bit 1 time `;
        } else{
            msg += `hasn't been beaten `;
        }
        return msg + `. Total calories:${this.getCalories()}.`;
    };
};
let americanBurger = new Hamburger('american', 700);
console.log(americanBurger.getCalories());

console.log(americanBurger.getCalories());
americanBurger.bite();
console.log(americanBurger.info());


