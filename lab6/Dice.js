class Dice {
  constructor(numDice = 1) {
    this.numDice = numDice;                   // Number of dice
    this.currentValues = Array(numDice).fill(0); // Initialize dice values to 0
  }

  roll() {
    // Roll each die, generating a random value between 1 and 6
    this.currentValues = Array.from({ length: this.numDice }, () => Math.floor(Math.random() * 6) + 1);
    return this.currentValues;
  }
}

// Example usage
const dice = new Dice(2);      // Create a dice object with 2 dice
console.log(dice.roll());      // Roll the dice and print their values
console.log(dice.currentValues); // Check current values after roll
