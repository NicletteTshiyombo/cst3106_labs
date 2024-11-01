class YatzyGame {
    constructor() {
        this.totalScore = 0;
        this.round = 1;
        this.rollCount = 3;
        this.engine = new YatzyEngine();
        this.initializeGame();
    }

    initializeGame() {
        document.getElementById('roll-button').addEventListener('click', () => this.rollDice());
        document.getElementById('end-turn-button').addEventListener('click', () => this.endTurn());
        document.getElementById('end-game-button').addEventListener('click', () => this.endGame());
        this.updateRollCountDisplay();
        this.updateTotalScoreDisplay();
    }

    rollDice() {
        if (this.rollCount > 0) {
            dice.forEach(die => {
                if (!die.selected) {
                    die.value = die.roll();
                }
            });
            displayDice();
            this.rollCount--;
            this.updateRollCountDisplay();
        }
        if (this.rollCount === 0) {
            rollButton.disabled = true;
        }
    }

    endTurn() {
        const diceValues = dice.map(die => die.value);
        const { category, score } = this.engine.getBestCategory(diceValues);
        this.engine.scoreTable[category] = score;
        this.totalScore += score;

        document.getElementById(`score-${category.toLowerCase().replace(/ /g, '-')}`).textContent = score;
        this.updateTotalScoreDisplay();

        this.round++;
        this.resetRollCount();

        if (this.round > 13) {
            this.endGame();
        }
    }

    endGame() {
        alert(`Game Over! Your final score is ${this.totalScore} points.`);
        this.startNewGame();
    }

    startNewGame() {
        this.totalScore = 0;
        this.round = 1;
        this.engine = new YatzyEngine();
        this.clearScorecard();
        this.resetRollCount();
        this.updateTotalScoreDisplay();
    }

    clearScorecard() {
        Object.keys(this.engine.scoreTable).forEach(category => {
            this.engine.scoreTable[category] = null;
            document.getElementById(`score-${category.toLowerCase().replace(/ /g, '-')}`).textContent = '';
        });
    }

    updateRollCountDisplay() {
        document.getElementById('roll-count').textContent = this.rollCount;
    }

    resetRollCount() {
        this.rollCount = 3;
        rollButton.disabled = false;
        this.updateRollCountDisplay();
        dice.forEach(die => die.selected = false);
        displayDice();
    }

    updateTotalScoreDisplay() {
        document.getElementById('total-score').textContent = this.totalScore;
    }
}

const game = new YatzyGame();
