const Hamburger = function(type,calories){
    let cheseAdded = false;
    let tomatoQuant = 2;
    this.type=type;
    this.getCalories= function(){
        return calories;
    };
    this.setCalories = function(amount){
        calories = amount;
    };
    this.addCheese =function(){
        if(!cheseAdded){
            this.setCalories(this.getCalories() + 120);
            cheseAdded = true;
        }else{
            console.log( 'Sorry,you can add chese only once!');
        }
    };
    this.addTomato= function(){
      if(tomatoQuant>0){
         this.setCalories(this.getCalories() + 20);
         tomatoQuant--;
      }else{
          console.log('Sorry, you can add tomatoes only twice!');
      }
    };
  };
  let americanBurger = new Hamburger('American', 700);
  console.log(americanBurger.getCalories());
  americanBurger.addTomato();
  console.log(americanBurger.getCalories());
  americanBurger.addTomato();
  console.log(americanBurger.getCalories());
  americanBurger.addTomato();
  americanBurger.addTomato();
  