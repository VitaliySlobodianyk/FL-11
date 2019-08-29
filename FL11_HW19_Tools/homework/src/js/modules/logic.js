
let Game = function (rounds = 3) {
    this.tries = rounds;
    this.statistic = {
        computer: 0,
        player: 0
    };
    this.addComputerWin = function () {
        this.statistic.computer++;
    };
    this.addPlayerWin = function () {
            this.statistic.player++;
    };
    this.getWinner = function(playerToken, computerToken){
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
    this.isGameFinished = function () {
        return this.tries === 0;
    };
    this.getGameResults = function () {
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
    this.getNumberOfRound = function () {
        return `Round ${rounds - this.tries} \\ ${rounds}`;
    };
};
Game.prototype.whoWon = function (pretendent, resultOfGame) {
    if (resultOfGame === 'draw') {
        return 'Draw';
    } else if (resultOfGame === pretendent) {
        return 'You Won!';
    } else {
        return 'You Loose!';
    }
};

window.Game = Game;


