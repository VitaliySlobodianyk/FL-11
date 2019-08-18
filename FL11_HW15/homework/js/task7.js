const Hamburger = function (type, calories, addSecretIngredient = false) {
    let cheeseAdded = false;
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
            if (!cheeseAdded) {
                this.setCalories(this.getCalories() + 120);
                secretIngredient = -1;
                cheeseAdded = true;
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
                secretIngredient = -1;
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
};
let americanBurger = new Hamburger('American', 700);
console.log(americanBurger.getCalories());
americanBurger.addSecretIngredient();
americanBurger.addTomato();
americanBurger.addCheese();
console.log(americanBurger.getCalories());
americanBurger.bite();
americanBurger.bite();
americanBurger.bite();
americanBurger.addTomato();


