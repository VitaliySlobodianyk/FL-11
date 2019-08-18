const Hamburger = function(type,calories){
    let cheseAdded = false;
    this.type=type;
    this.getCalories= function(){
        return calories;
    };
    this.setCalories = function(amount){
        calories = amount;
    };
    this.addCheese =function(){
        if(!cheseAdded){
            this.setCalories(this.getCalories()+120);
            cheseAdded = true;
        }else{
            console.log( 'Sorry,you can add chese only once!');
        }
    };
  };
  let americanBurger = new Hamburger('American', 700);
  console.log(americanBurger.getCalories());
  americanBurger.addCheese();
  console.log(americanBurger.getCalories());
  americanBurger.addCheese();
  