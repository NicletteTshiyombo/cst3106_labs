class YatzyEngine {
    constructor() {
        this.scoreTable = {
            Aces: null,
            Twos: null,
            Threes: null,
            Fours: null,
            Fives: null,
            Sixes: null,
            'Three of a Kind': null,
            'Four of a Kind': null,
            'Full House': null,
            'Small Straight': null,
            'Large Straight': null,
            Yatzy: null,
            Chance: null,
        };
    }

    calculateScore(category, diceValues) {
        switch (category) {
            case 'Aces': return this.calculateNumberScore(diceValues, 1);
            case 'Twos': return this.calculateNumberScore(diceValues, 2);
            case 'Threes': return this.calculateNumberScore(diceValues, 3);
            case 'Fours': return this.calculateNumberScore(diceValues, 4);
            case 'Fives': return this.calculateNumberScore(diceValues, 5);
            case 'Sixes': return this.calculateNumberScore(diceValues, 6);
            case 'Three of a Kind': return this.calculateOfAKind(diceValues, 3);
            case 'Four of a Kind': return this.calculateOfAKind(diceValues, 4);
            case 'Full House': return this.calculateFullHouse(diceValues);
            case 'Small Straight': return this.calculateStraight(diceValues, 4);
            case 'Large Straight': return this.calculateStraight(diceValues, 5);
            case 'Yatzy': return this.calculateYatzy(diceValues);
            case 'Chance': return this.calculateChance(diceValues);
            default: return 0;
        }
    }

    calculateNumberScore(diceValues, number) {
        return diceValues.filter(value => value === number).length * number;
    }

    calculateOfAKind(diceValues, count) {
        const counts = this.getCounts(diceValues);
        return counts.some(c => c >= count) ? diceValues.reduce((a, b) => a + b, 0) : 0;
    }

    calculateFullHouse(diceValues) {
        const counts = this.getCounts(diceValues);
        return counts.includes(3) && counts.includes(2) ? 25 : 0;
    }

    calculateStraight(diceValues, length) {
        const uniqueValues = [...new Set(diceValues)].sort();
        const targetStraights = length === 4 ? [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]] : [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6]];
        return targetStraights.some(straight => straight.every(value => uniqueValues.includes(value))) ? (length === 4 ? 30 : 40) : 0;
    }

    calculateYatzy(diceValues) {
        return new Set(diceValues).size === 1 ? 50 : 0;
    }

    calculateChance(diceValues) {
        return diceValues.reduce((a, b) => a + b, 0);
    }

    getCounts(diceValues) {
        const counts = Array(6).fill(0);
        diceValues.forEach(value => counts[value - 1]++);
        return counts;
    }

    getBestCategory(diceValues) {
        const categories = Object.keys(this.scoreTable).filter(category => this.scoreTable[category] === null);
        const scores = categories.map(category => ({
            category,
            score: this.calculateScore(category, diceValues)
        }));
        scores.sort((a, b) => b.score - a.score);
        return scores[0] || { category: categories[0], score: 0 };
    }
}
