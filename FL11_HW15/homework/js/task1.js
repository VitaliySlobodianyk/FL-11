const Hamburger = function(type,calories){
  this.type=type;
  this.calories=calories;
};
let americanBurger = new Hamburger('American', 700);
console.log(americanBurger);