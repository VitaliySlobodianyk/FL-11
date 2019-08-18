const Hamburger = function(type,calories){
    this.type=type;
    this.getCalories= function(){
        return calories;
    };
    this.setCalories = function(amount){
        calories = amount;
    };
  };
  let americanBurger = new Hamburger('American', 700);
 console.log(americanBurger.getCalories());
 americanBurger.setCalories(650);
 console.log(americanBurger.getCalories());