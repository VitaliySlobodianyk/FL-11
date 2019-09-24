import { lib } from '../library';
export const logWorker = {
  list: document.querySelector('.log__list'),
  log(string) {
    let li = document.createElement('li');
    li.textContent = string;
    logWorker.list.appendChild(li);
  }
};

export const messageBox = {
  box: document.querySelector('.info__field--content'),
  showMessage(content) {
    messageBox.box.textContent = content;
  }
};

export const resetBut = {
  button: document.getElementById('reset_but'),
  show() {
    resetBut.button.style.visibility = 'visible';
  },
  hide() {
    resetBut.button.style.visibility = 'hidden';
  }
};

export const spinner = {
  animationBlock: document.getElementById('animation-block'),
  elements: [
    document.getElementById('computer-rock').querySelector('i'),
    document.getElementById('computer-paper').querySelector('i'),
    document.getElementById('computer-scissors').querySelector('i')
  ],
  working: null,
  animate() {
    spinner.animationBlock.style.display = 'block';
    spinner.working = setInterval(() => {
      this.animationBlock.innerHTML = spinner.elements[lib.getRandomInt(0, 3)].outerHTML;
    }, 150);
  },
  hide() {
    spinner.animationBlock.style.display = 'none';
    clearInterval(spinner.working);
  },
  work() {
    spinner.animate();
  }
};

export const userCards = {
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

export const computerCards = {
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

export const gameButtons = {
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
