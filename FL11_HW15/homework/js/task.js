const Ingredient = function (name,calories = 0, timesToImplement = 0) {
    this.name =name;
    this.calories = calories;
    this.timesToImplement = timesToImplement;
    this.add = function () {
        if (this.timesToImplement > 0) {
            this.timesToImplement--;
            return calories;
        } else {
            return false;
        }
    };
    this.implement = function () {
        let calorage = this.add();
        if (calorage) {
            return calorage;
        } else if(!calorage && timesToImplement===1) {
            console.log(`Sorry,you can add ${this.name} only once!`);
        }else{
            console.log(`Sorry,you can add ${this.name} only ${timesToImplement} times`);
        }
    };
    this.info = function () {
        if (this.timesToImplement === timesToImplement) {
            return `without ${this.name}`;
        } else if (timesToImplement-this.timesToImplement===1) {
            return `with ${this.name}`;
        }else{
            return `with ${timesToImplement-this.timesToImplement} ${this.name}`;
        }
    };
};

const SecretIngredient = function (calories = 0, timesToImplement = 0) {
    Ingredient.call(this,'secret ingredient',calories,timesToImplement);
    this.canBeAdded = true;
    this.implement = function () {
        if (this.canBeAdded) {
            let calorage = this.add();
            if (calorage) {
                return calorage;
            } else {
              console.log(`Sorry,you can add ${this.name} only once!`);
            }
        } else if (!this.canBeAdded && this.timesToImplement > 0) {  
               console.log(`Sorry,you can add ${this.name} only before other ingredients!`);
        } else{
            console.log(`Sorry,you can add ${this.name} only once!`);
        }
    };
};

const Hamburger = function (type, calories, addSecretIngredient = false) {
    let cheese = new Ingredient('cheese',120,1);
    let tomatoes = new Ingredient('tomatoes',20,2);
    let secretIng = new SecretIngredient(100,1);
    let beaten = 0;
    let that = this;
    this.type = type;
    this.getCalories = function () {
        return calories;
    };
    this.setCalories = function (amount) {
        calories = amount;
    };
    let addIngredient = function (ingredient) {
        if (beaten === 0) {
            let calories = ingredient.implement();
            if (calories) {
                that.setCalories(that.getCalories() + calories);
                secretIng.canBeAdded = false;
            }
        } else {
            console.log(`Sorry,you can't add ${ingredient.name}!`);
        }
    };
    this.addCheese = function () {
        addIngredient(cheese);
    };
    this.addTomato = function () {
        addIngredient(tomatoes);
    };
    this.addSecretIngredient = function () {
        addIngredient(secretIng);
    };
    if (addSecretIngredient) {
        this.addSecretIngredient();
    }
    this.bite = function () {
        beaten++;
    };
    this.info = function () {
        return `${getType()} ${secretIng.info()}, ${cheese.info()}, ${tomatoes.info()}, ${isBeaten()}. 
        Total calories:${this.getCalories()}.`;
    };
    let getType = function () {
        if (typeof that.type === 'string' && that.type.length > 0) {
            return `${that.type[0].toUpperCase() + that.type.slice(1)} hamburger: `;
        } else {
            return 'Unknown hamburger: ';
        }
    };
    let isBeaten = function () {
        if (beaten === 0) {
            return 'hasn\'t been beaten';
        } else if (beaten === 1) {
            return 'has been beaten one time';
        } else {
            return `has been beaten ${beaten} times`;
        }
    };
};
let americanBurger = new Hamburger('american', 700);
console.log(americanBurger.getCalories());
americanBurger.addSecretIngredient();
americanBurger.addTomato();
americanBurger.addSecretIngredient();
americanBurger.addTomato();
americanBurger.addTomato();
americanBurger.addTomato();
americanBurger.addCheese();
americanBurger.addCheese();
console.log(americanBurger.getCalories());
americanBurger.bite();
americanBurger.addCheese();
americanBurger.addTomato();

console.log(americanBurger.info());


