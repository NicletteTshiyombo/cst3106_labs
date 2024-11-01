 class Dice {
    constructor() {
        this.value = this.roll();
        this.selected = false;
    }

    roll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    toggleSelection() {
        this.selected = !this.selected;
    }
}

const dice = Array.from({ length: 5 }, () => new Dice());
const rollButton = document.getElementById('roll-button');

function displayDice() {
    dice.forEach((die, index) => {
        const dieElement = document.getElementById(`dice-${index + 1}`);
        dieElement.innerHTML = createDieFace(die.value);
        dieElement.classList.toggle("selected", die.selected);
    });
}

function createDieFace(value) {
    const dotsHTML = {
        1: '<div class="dot middle"></div>',
        2: '<div class="dot top-left"></div><div class="dot bottom-right"></div>',
        3: '<div class="dot top-left"></div><div class="dot middle"></div><div class="dot bottom-right"></div>',
        4: '<div class="dot top-left"></div><div class="dot top-right"></div><div class="dot bottom-left"></div><div class="dot bottom-right"></div>',
        5: '<div class="dot top-left"></div><div class="dot top-right"></div><div class="dot middle"></div><div class="dot bottom-left"></div><div class="dot bottom-right"></div>',
        6: '<div class="dot top-left"></div><div class="dot top-right"></div><div class="dot middle-left"></div><div class="dot middle-right"></div><div class="dot bottom-left"></div><div class="dot bottom-right"></div>',
    };
    return dotsHTML[value];
}

function rollDice() {
    dice.forEach(die => {
        if (!die.selected) {
            die.value = die.roll();
        }
    });
    displayDice();
}

function toggleDiceSelection(index) {
    dice[index].toggleSelection();
    displayDice();
}

displayDice();
