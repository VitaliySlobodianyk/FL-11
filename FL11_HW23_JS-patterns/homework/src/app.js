const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


class User {
    constructor(name, orderTotalPrice) {
        this.getName = () => name;
        this.orderTotalPrice = () => orderTotalPrice;
        this.discount = false;
        this.bonuses = false;
    }
    makeOrder() {
        return ` Name: ${this.getName()}  Price: ${this.orderTotalPrice()}UAH `;
    }
}

class Discount {
    constructor(target, discount, type) {

        this.user = target;
        this.discount = discount;
        this.typeofDiscount = type;
        this.getName = target.getName;
        this.orderTotalPrice = () => target.orderTotalPrice() * (1 - this.discount / 100);
    }
    makeOrder() {
        return ` ${this.user.makeOrder()}\n 
        With ${this.typeofDiscount} discount of ${this.discount}% and ${this.user.orderTotalPrice() - this.orderTotalPrice() }UAH\n
        Current price: ${this.orderTotalPrice()} UAH`;
    }
}


class getDiscount {
    constructor(target) {
        this.user = target;
        this.getName = target.getName;
        this.discount = target.discount;
        this.orderTotalPrice = target.orderTotalPrice;
        if (!this.discount) {
            let date = new Date('2019-09-14T01:10:00');
            if (date.getDay() === 6 || date.getDay() === 0) {
                this.user = new Discount(this.user, random(0, 20), "weekend");
            }
            if (date.getHours() <= 23 || date.getDay() >= 6) {
                this.user = new Discount(this.user, random(0, 5), "night");
            }
            this.orderTotalPrice = this.user.orderTotalPrice;
            this.discount = true;
        }

    }
    makeOrder() {
        return this.user.makeOrder();
    }
}

class setBonus {
    constructor(target, bonusPrice) {
        this.user = target;
        this.getName = target.getName;
        this.getName = target.getName;
        this.bonuses = target.bonuses;
        this.orderTotalPrice = target.orderTotalPrice;
        this.priceOfBonus = () => bonusPrice;

        if (!this.bonuses) {
            this.bonusesToAdd = parseInt(this.orderTotalPrice() / 100);
            this.bonuses = true;
        }
    }
    makeOrder() {
        if (this.bonusesToAdd) {
            return `${this.user.makeOrder()} \n 
        Amount of bonuses added : ${this.bonusesToAdd} 
        At sum of ${this.bonusesToAdd * this.priceOfBonus()}UAH `;

        } else {
            return this.user.makeOrder();
        }
    }
}

let petro = new User("Petro", 1500);
petro = new getDiscount(petro);
petro = new setBonus(petro, 5);

console.log(petro.makeOrder());