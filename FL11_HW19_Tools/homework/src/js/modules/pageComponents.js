let logWorker = {
  list: document.querySelector('.log__list'),
  log(string) {
    let li = document.createElement('li');
    li.textContent = string;
    logWorker.list.appendChild(li);
  }
};
//або  так  
window.logWorker = logWorker;
//або  так  
export default logWorker;

let messageBox = {
  box: document.querySelector('.info__field--content'),
  showMessage(content) {
    messageBox.box.textContent = content;
  }
};
window.messageBox = messageBox;

let resetBut = {
  button: document.getElementById('reset_but'),
  show() {
    resetBut.button.style.display = 'block';
  },
  hide() {
    resetBut.button.style.display = 'none';
  }
};
window.resetBut = resetBut;

let spinner = {
  object: document.getElementById('floatingCircles'),
  show() {
    spinner.object.style.display = 'block';
  },
  hide() {
    spinner.object.style.display = 'none';
  }
};
window.spinner = spinner;

let userCards = {
  allUserCards: document.querySelectorAll('.player__card .character'),
  rock: document.getElementById('player-rock'),
  paper: document.getElementById('player-paper'),
  scissors: document.getElementById('player-scissors'),
  hideAllCards() {
    Array.prototype.forEach.call(userCards.allUserCards, element => {
      element.style.display = 'none';
    });
  },
  showCard(card) {
    card.style.display = 'block';
  }
};
window.userCards = userCards;

let computerCards = {
  keywords: ['rock', 'paper', 'scissors'],
  allComputerCards: document.querySelectorAll('.computer__card .character'),
  rock: document.getElementById('computer-rock'),
  paper: document.getElementById('computer-paper'),
  scissors: document.getElementById('computer-scissors'),
  randomCard() {
    return computerCards.keywords[lib.getRandomInt(0, computerCards.keywords.length)];
  },
  hideAllCards() {
    Array.prototype.forEach.call(computerCards.allComputerCards, element => {
      element.style.display = 'none';
    });
  },
  showCard(card) {
    card.style.display = 'block';
  }
};
window.computerCards = computerCards;

let gameButtons = {
  buttons: document.getElementsByClassName('game_button'),
  makeUnactive() {
    Array.prototype.forEach.call(gameButtons.buttons, element => {
      element.disabled = true;
    });
  },
  makeActive() {
    Array.prototype.forEach.call(gameButtons.buttons, element => {
      element.disabled = false;
    });
  }
};
window.gameButtons = gameButtons;
