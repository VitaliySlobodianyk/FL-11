resetBut.button.addEventListener('click', () => {
  window.location.reload();
});

let game = new Game();

Array.prototype.forEach.call(gameButtons.buttons, element => {
  element.addEventListener('click', () => {
    computerCards.hideAllCards();
    spinner.show();
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
