export const Game = function(rounds = 3) {
  this.tries = rounds;
  this.statistic = {
    computer: 0,
    player: 0
  };
  this.addComputerWin = () => this.statistic.computer++;
  this.addPlayerWin = () => this.statistic.player++;

  this.getWinner = (playerToken, computerToken) => {
    this.tries--;
    if (playerToken === computerToken) {
      return 'draw';
    } else if (computerToken === 'rock') {
      if (playerToken === 'paper') {
        this.addPlayerWin();
        return 'player';
      } else {
        this.addComputerWin();
        return 'computer';
      }
    } else if (computerToken === 'paper') {
      if (playerToken === 'scissors') {
        this.addPlayerWin();
        return 'player';
      } else {
        this.addComputerWin();
        return 'computer';
      }
    } else if (computerToken === 'scissors') {
      if (playerToken === 'rock') {
        this.addPlayerWin();
        return 'player';
      } else {
        this.addComputerWin();
        return 'computer';
      }
    }
  };
  this.isGameFinished = () => this.tries === 0;

  this.getGameResults = () => {
    let gameLog = {
      winner: 'Winner: ',
      score: `Player-${this.statistic.player} : Computer-${this.statistic.computer} `
    };
    if (this.statistic.computer === this.statistic.player) {
      gameLog.winner = 'Draw';
    } else if (this.statistic.computer > this.statistic.player) {
      gameLog.winner += 'Computer';
    } else {
      gameLog.winner += 'Player';
    }
    return gameLog;
  };
  this.getNumberOfRound = () => `Round ${rounds - this.tries} \\ ${rounds}`;
};
Game.prototype.whoWon = (pretendent, resultOfGame) => {
  if (resultOfGame === 'draw') {
    return 'Draw';
  } else if (resultOfGame === pretendent) {
    return 'You Won!';
  } else {
    return 'You Loose!';
  }
};
