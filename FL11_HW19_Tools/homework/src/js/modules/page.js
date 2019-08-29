let logWorker ={
    list: document.querySelector('.log__list'),
    log(string){
      let li = document.createElement('li');
      li.textContent = string;
      logWorker.list.appendChild(li);
    }
};
let messageBox= {
    box: document.querySelector('.info__field--content'),
    showMessage(content){
        messageBox.box.textContent=content;
    },
};

let resetBut={
    button:document.getElementById('reset_but'),
    show(){
        resetBut.button.style.display= 'block';
    },
    hide(){
        resetBut.button.style.display= 'none';
    }
};

resetBut.button.addEventListener('click',()=>{
    window.location.reload();
});

let spinner= {
object:document.getElementById('floatingCircles'),
show(){
    spinner.object.style.display='block';
},
hide(){
    spinner.object.style.display='none';
}
};
let userCards= {
    allUserCards: document.querySelectorAll('.player__card .character'),
    rock: document.getElementById('player-rock'),
    paper: document.getElementById('player-paper'),
    scissors: document.getElementById('player-scissors'),
    hideAllCards(){
        Array.prototype.forEach.call(userCards.allUserCards,(element)=>{
             element.style.display= 'none';
            });
    },
    showCard(card){
        card.style.display='block';
    }
};
let computerCards ={
    keywords:['rock','paper','scissors'],
    allComputerCards: document.querySelectorAll('.computer__card .character'),
    rock: document.getElementById('computer-rock'),
    paper: document.getElementById('computer-paper'),
    scissors: document.getElementById('computer-scissors'),
    randomCard(){
      return computerCards.keywords[lib.getRandomInt(0,computerCards.keywords.length)];
    },
    hideAllCards(){
        Array.prototype.forEach.call(computerCards.allComputerCards,(element)=>{
             element.style.display= 'none';
            });
    },
    showCard(card){
        card.style.display='block';
    }
};

let gameButtons = {
    buttons:document.getElementsByClassName('game_button'),
    makeUnactive(){
        Array.prototype.forEach.call(gameButtons.buttons,(element)=>{
            element.disabled= true;
            });
    },
    makeActive(){
        Array.prototype.forEach.call(gameButtons.buttons,(element)=>{
            element.disabled= false;
            });
    }
};

let game = new Game();

Array.prototype.forEach.call(gameButtons.buttons,(element)=>{
    element.addEventListener('click',()=>{
       console.log('click');
       computerCards.hideAllCards();
       spinner.show();
        userCards.hideAllCards();
        userCards.showCard(userCards[element.id]);
        gameButtons.makeUnactive();
        setTimeout(() => {
            spinner.hide();
            let computerChoice= computerCards.randomCard();
            computerCards.showCard(computerCards[computerChoice]);
            let winner = game.getWinner(element.id,computerChoice);
            if(winner==='draw'){
                messageBox.showMessage(`${game.getNumberOfRound()}. Draw!`);
            }else{
                messageBox.showMessage(`${game.getNumberOfRound()}. Winner: ${winner}`);
            }
            let whoWon = game.whoWon('player',winner);
            logWorker.log(`${game.getNumberOfRound()}. 
            ${lib.uppercaseFirstLetter(element.id)} vs ${lib.uppercaseFirstLetter(computerChoice)}.
            ${whoWon}`);      
            if(game.isGameFinished()){ 
                let results = game.getGameResults();
                messageBox.showMessage(`Game Finished! Results in "Battle Log" Hit "Reset" to restart!`);
                logWorker.log(`Game Finished! Results: ${results.winner}. Score: ${results.score}`);      
                resetBut.show();   
            }else{
                gameButtons.makeActive();
            }
            
       }, 2000);
    });
});
