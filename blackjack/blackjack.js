const CARD_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

const DECK = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerHand = [];
let dealerHand = [];

function calculateHandValue(hand) {
    let sum = 0;
    let numAces = 0;

    for (const card of hand) {
        sum += CARD_VALUES[card];
        if (card === 'A') {
            numAces++;
        }
    }

    while (numAces > 0 && sum > 21) {
        sum -= 10;
        numAces--;
    }

    return sum;
}

function dealCard() {
    const randomIndex = Math.floor(Math.random() * DECK.length);
    const card = DECK[randomIndex];
    DECK.splice(randomIndex, 1);
    return card;
}

function newGame() {
    playerHand = [];
    dealerHand = [];
    DECK = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (let i = 0; i < 2; i++) {
        playerHand.push(dealCard());
        dealerHand.push(dealCard());
    }

    updateUI();
    checkBlackjack();
}

function hit() {
    playerHand.push(dealCard());
    updateUI();
    checkPlayerBust();
}

function stand() {
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }

    updateUI();
    checkWinner();
}

function checkBlackjack() {
    if (calculateHandValue(playerHand) === 21) {
        alert('Player has Blackjack! You win!');
        newGame();
    } else if (calculateHandValue(dealerHand) === 21) {
        alert('Dealer has Blackjack! Dealer wins.');
        newGame();
    }
}

function checkPlayerBust() {
    if (calculateHandValue(playerHand) > 21) {
        alert('Player busted! Dealer wins.');
        newGame();
    }
}

function checkWinner() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
        alert('Player busted! Dealer wins.');
    } else if (dealerValue > 21 || playerValue > dealerValue) {
        alert('Player wins!');
    } else if (dealerValue > playerValue) {
        alert('Dealer wins.');
    } else {
        alert('It\'s a tie!');
    }

    newGame();
}

function updateUI() {
    document.getElementById('player-hand').textContent = `Player Hand: ${playerHand.join(', ')}`;
    document.getElementById('dealer-hand').textContent = `Dealer Hand: ${dealerHand.join(', ')}`;

    document.getElementById('player-value').textContent = `Player Value: ${calculateHandValue(playerHand)}`;
    document.getElementById('dealer-value').textContent = `Dealer Value: ${calculateHandValue(dealerHand)}`;
}

document.getElementById('new-game-button').addEventListener('click', newGame);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

newGame();
