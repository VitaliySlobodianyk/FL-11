const Hamburger = function(type,calories){
    let cheseAdded = false;
    let tomatoQuant = 2;
    let secretIngredient = 0;
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
            secretIngredient=-1;
            cheseAdded = true;
        }else{
            console.log( 'Sorry,you can add chese only once!');
        }
    };
    this.addTomato= function(){
      if(tomatoQuant>0){
         this.setCalories(this.getCalories() + 20);
         tomatoQuant--;
         secretIngredient=-1;
      }else{
          console.log('Sorry, you can add tomatoes only twice!');
      }
    };
    this.addSecretIngredient = function(){
        if(secretIngredient===0){
            this.setCalories(this.getCalories() + 100);
            secretIngredient=1;
        }else if(secretIngredient=== -1){
            console.log('Sorry, you can add secret ingredient only before another ingredient!');
        }else{
            console.log('Sorry, you can add secret ingredient only once!');
        }
    };
  };
  let americanBurger = new Hamburger('American', 700);
  console.log(americanBurger.getCalories());
  americanBurger.addTomato();
  console.log(americanBurger.getCalories());
  americanBurger.addSecretIngredient();
  
  