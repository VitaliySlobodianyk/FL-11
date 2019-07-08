const double =2;
const nextLevelIncrease=4;
let gameEnabled=false;

gameEnabled=confirm('Do you want to play a game?');
if(gameEnabled){
    while(gameEnabled){
        let userPrize=100;
        let userTotalPrize=0;
        let startRange=0;
        let endRange =8; 
        let continueGame=true;
        while(continueGame){
        let won;  
        let userCurrentPrize=userPrize; 
        let tries=3;
        let randomNumber= parseInt(Math.random() * (endRange - startRange + 1), 10) + startRange;
        console.log(randomNumber);  
        while(tries>0 && !won ){
        let userNumber=parseInt(prompt(` Choose a roulette pocket number from ${startRange};${endRange}
        \n Attempts left ${tries}
        \n Total Prize ${userTotalPrize}$
        \n Possible prize on current attempt ${userCurrentPrize}$`));
        if(userNumber===randomNumber){
            won=true;
            userTotalPrize+=userCurrentPrize;
            continueGame=confirm(`Congratulation, you won! Your prize is: ${userCurrentPrize}$.
            \n Do you want to continue?`);
        }else{
          tries--;
          userCurrentPrize/=double;
        }
    }   
    if(!won || !continueGame){
        continueGame=won;
        userTotalPrize= !won? 0: userTotalPrize;
        alert(`Thank you for your participation. Your prize is: ${userTotalPrize} $`);
        gameEnabled=confirm('Do you want to play again?');      
    }else{
        userPrize*=double;
        endRange+=nextLevelIncrease;
    }       
   }
}
}else{
    alert('You did not become a billionaire, but can.');
}

