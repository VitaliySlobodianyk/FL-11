import { lib } from '../library';
import { Game } from './logic';
import { logWorker, messageBox, resetBut, spinner, userCards, computerCards, gameButtons } from './pageComponents';

let game = new Game();

resetBut.button.addEventListener('click', () => {
  window.location.reload();
});

Array.prototype.forEach.call(gameButtons.buttons, element => {
  element.addEventListener('click', () => {
    computerCards.hideAllCards();
    spinner.work();
    userCards.hideAllCards();
    userCards.showCard(userCards[element.id]);
    gameButtons.makeUnactive();
    setTimeout(() => {
      spinner.hide();
      let computerChoice = computerCards.randomCard();
      computerCards.showCard(computerCards[computerChoice]);
      let winner = game.getWinner(element.id, computerChoice);
      if (winner === 'draw') {
        messageBox.showMessage(`${game.getNumberOfRound()}. Draw!`);
      } else {
        messageBox.showMessage(`${game.getNumberOfRound()}. Winner: ${winner}`);
      }
      let whoWon = game.whoWon('player', winner);
      logWorker.log(`${game.getNumberOfRound()}. 
            ${lib.uppercaseFirstLetter(element.id)} vs ${lib.uppercaseFirstLetter(computerChoice)}.
            ${whoWon}`);
      if (game.isGameFinished()) {
        let results = game.getGameResults();
        messageBox.showMessage(`Game Finished! Results in "Battle Log" Hit "Reset" to restart!`);
        logWorker.log(`Game Finished! Results: ${results.winner}. Score: ${results.score}`);
        resetBut.show();
      } else {
        gameButtons.makeActive();
      }
    }, 2000);
  });
});
