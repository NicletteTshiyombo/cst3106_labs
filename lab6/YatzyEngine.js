class YatzyEngine {
  constructor() {
    // Initialize score table for Yatzy categories
    this.scoreTable = {
      ones: null,
      twos: null,
      threes: null,
      fours: null,
      fives: null,
      sixes: null,
      pair: null,
      twoPairs: null,
      threeOfAKind: null,
      fourOfAKind: null,
      fullHouse: null,
      smallStraight: null,
      largeStraight: null,
      yatzy: null,
      chance: null
    };
  }

  // Calculate score for a given category based on dice values
  calculateScore(category, diceValues) {
    let score = 0;
    const counts = this.getDiceCounts(diceValues);

    switch (category) {
      case 'ones':
      case 'twos':
      case 'threes':
      case 'fours':
      case 'fives':
      case 'sixes':
        const num = parseInt(category);
        score = diceValues.filter(value => value === num).reduce((a, b) => a + b, 0);
        break;

      case 'pair':
        score = this.findHighestOfAKind(counts, 2) * 2;
        break;

      case 'twoPairs':
        const pairs = this.findTwoPairs(counts);
        if (pairs.length === 2) score = pairs.reduce((a, b) => a + b) * 2;
        break;

      case 'threeOfAKind':
        score = this.findHighestOfAKind(counts, 3) * 3;
        break;

      case 'fourOfAKind':
        score = this.findHighestOfAKind(counts, 4) * 4;
        break;

      case 'fullHouse':
        score = this.calculateFullHouse(counts);
        break;

      case 'smallStraight':
        score = this.isStraight(diceValues, [1, 2, 3, 4, 5]) ? 15 : 0;
        break;

      case 'largeStraight':
        score = this.isStraight(diceValues, [2, 3, 4, 5, 6]) ? 20 : 0;
        break;

      case 'yatzy':
        score = counts.includes(5) ? 50 : 0;
        break;

      case 'chance':
        score = diceValues.reduce((a, b) => a + b, 0);
        break;

      default:
        score = 0;
    }

    return score;
  }

  // Checks if a score selection is valid for a category
  isValidSelection(category, diceValues) {
    const score = this.calculateScore(category, diceValues);
    return score > 0;
  }

  // Utility: Count occurrences of each die face (1-6)
  getDiceCounts(diceValues) {
    const counts = Array(6).fill(0);
    diceValues.forEach(value => counts[value - 1]++);
    return counts;
  }

  // Utility: Finds highest number that has at least 'n' of a kind
  findHighestOfAKind(counts, n) {
    for (let i = counts.length - 1; i >= 0; i--) {
      if (counts[i] >= n) return i + 1;
    }
    return 0;
  }

  // Utility: Finds two pairs if they exist
  findTwoPairs(counts) {
    const pairs = [];
    counts.forEach((count, index) => {
      if (count >= 2) pairs.push(index + 1);
    });
    return pairs.slice(-2);  // Get the highest two pairs
  }

  // Utility: Calculate full house score if valid
  calculateFullHouse(counts) {
    let threeOfAKind = 0, pair = 0;
    counts.forEach((count, index) => {
      if (count === 3) threeOfAKind = (index + 1) * 3;
      if (count === 2) pair = (index + 1) * 2;
    });
    return threeOfAKind && pair ? threeOfAKind + pair : 0;
  }

  // Utility: Checks for a straight (small or large)
  isStraight(diceValues, sequence) {
    return sequence.every(num => diceValues.includes(num));
  }
}

// Example usage
const engine = new YatzyEngine();
const diceValues = [2, 3, 3, 4, 5];

console.log(engine.calculateScore("threeOfAKind", diceValues));  // Calculates score for three of a kind
console.log(engine.isValidSelection("threeOfAKind", diceValues)); // Checks if three of a kind is a valid selection
console.log(engine.scoreTable); // View the initialized score table
