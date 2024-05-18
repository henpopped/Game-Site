const CARD_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
};

let deck, playerHand, dealerHand;
let gameStarted = false;

function shuffleDeck() {
    let tempDeck = [];
    const suits = ['H', 'D', 'C', 'S'];
    const values = Object.keys(CARD_VALUES);

    for (const suit of suits) {
        for (const value of values) {
            tempDeck.push(value);
        }
    }

    // Shuffle the deck
    for (let i = tempDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempDeck[i], tempDeck[j]] = [tempDeck[j], tempDeck[i]];
    }

    return tempDeck;
}

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
    return deck.pop();
}

function newGame() {
    deck = shuffleDeck();
    playerHand = [];
    dealerHand = [];

    for (let i = 0; i < 2; i++) {
        playerHand.push(dealCard());
        dealerHand.push(dealCard());
    }

    gameStarted = true;
    updateUI();
    checkBlackjack();
    enableButtons();
}

function hit() {
    if (!gameStarted) return;
    playerHand.push(dealCard());
    updateUI();
    checkPlayerBust();
}

function stand() {
    if (!gameStarted) return;
    while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(dealCard());
    }

    updateUI();
    checkWinner();
}

function checkBlackjack() {
    if (calculateHandValue(playerHand) === 21) {
        setTimeout(() => alert('Player has Blackjack! You win!'), 10);
        endGame();
    } else if (calculateHandValue(dealerHand) === 21) {
        setTimeout(() => alert('Dealer has Blackjack! Dealer wins.'), 10);
        endGame();
    }
}

function checkPlayerBust() {
    if (calculateHandValue(playerHand) > 21) {
        setTimeout(() => alert('Player busted! Dealer wins.'), 10);
        endGame();
    }
}

function checkWinner() {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (playerValue > 21) {
        setTimeout(() => alert('Player busted! Dealer wins.'), 10);
    } else if (dealerValue > 21 || playerValue > dealerValue) {
        setTimeout(() => alert('Player wins!'), 10);
    } else if (dealerValue > playerValue) {
        setTimeout(() => alert('Dealer wins.'), 10);
    } else {
        setTimeout(() => alert('It\'s a tie!'), 10);
    }

    endGame();
}

function updateUI() {
    document.getElementById('player-hand').textContent = `Player Hand: ${playerHand.join(', ')}`;
    document.getElementById('dealer-hand').textContent = `Dealer Hand: ${dealerHand.join(', ')}`;

    document.getElementById('player-value').textContent = `Player Value: ${calculateHandValue(playerHand)}`;
    document.getElementById('dealer-value').textContent = `Dealer Value: ${calculateHandValue(dealerHand)}`;
}

function enableButtons() {
    document.getElementById('hit-button').disabled = false;
    document.getElementById('stand-button').disabled = false;
}

function disableButtons() {
    document.getElementById('hit-button').disabled = true;
    document.getElementById('stand-button').disabled = true;
}

function endGame() {
    gameStarted = false;
    disableButtons();
}

document.getElementById('new-game-button').addEventListener('click', newGame);
document.getElementById('hit-button').addEventListener('click', hit);
document.getElementById('stand-button').addEventListener('click', stand);

disableButtons(); // Initially disable Hit and Stand buttons
