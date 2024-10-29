class YatzyGame {
  constructor(players) {
    this.players = players;                // List of players
    this.currentPlayerIndex = 0;           // Tracks current player index
    this.currentRound = 1;                 // Tracks the current round
    this.scores = {};                      // Tracks scores for each player
    this.isGameActive = false;             // Game state

    players.forEach(player => {            // Initialize each player's score
      this.scores[player] = 0;
    });
  }

  
  startNewGame() {
    this.currentPlayerIndex = 0;
    this.currentRound = 1;
    this.isGameActive = true;
    for (let player in this.scores) {
      this.scores[player] = 0;             
    }
    console.log("New game started!");
  }

 
  endTurn() {
    if (!this.isGameActive) return console.log("Game is not active.");

    const currentPlayer = this.players[this.currentPlayerIndex];
    console.log(`${currentPlayer}'s turn has ended.`);

  
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

   
    if (this.currentPlayerIndex === 0) {
      this.currentRound++;
      console.log(`Round ${this.currentRound} begins.`);
    }

  
    if (this.currentRound > 15) this.endGame();
  }

  endGame() {
    this.isGameActive = false;
    let highestScore = 0;
    let winner = null;

    for (let player in this.scores) {
      if (this.scores[player] > highestScore) {
        highestScore = this.scores[player];
        winner = player;
      }
    }
    console.log(`Game over! ${winner} wins with a score of ${highestScore}.`);
  }
  
  updateScore(points) {
    if (!this.isGameActive) return console.log("Game is not active.");
    const currentPlayer = this.players[this.currentPlayerIndex];
    this.scores[currentPlayer] += points;
    console.log(`${currentPlayer} scored ${points}. Total score: ${this.scores[currentPlayer]}`);
  }
}

const game = new YatzyGame(["Alice", "Bob"]);
game.startNewGame();         // Start a new game
game.updateScore(25);        // Alice scores 25 points
game.endTurn();              // Alice ends her turn
game.updateScore(30);        // Bob scores 30 points
game.endTurn();              // Bob ends his turn
game.endGame();              // End the game and announce the winner
