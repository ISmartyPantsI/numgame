const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function chooseGameMode() {
    readline.question('Which game would you like to play?\n1. Normal Game (You guess the computer\'s number)\n2. Reverse Game (Computer guesses your number)\nEnter 1 or 2: ', mode => {
        if (mode === '1') {
            startNormalGame();
        } else if (mode === '2') {
            startReverseGame();
        } else {
            console.log('Invalid choice. Please enter 1 or 2.');
            chooseGameMode();
        }
    });
}

function startNormalGame() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log("I've picked a number between 1 and 100. Try to guess it!");
    let guessCount = 0;

    function askGuess() {
        readline.question('Enter your guess: ', guess => {
            guessCount++;
            const intGuess = parseInt(guess, 10);
            if (isNaN(intGuess)) {
                console.log('Please enter a valid number.');
                guessCount--;
                askGuess();
            } else if (intGuess < randomNumber) {
                console.log('Too low. Try again.');
                askGuess();
            } else if (intGuess > randomNumber) {
                console.log('Too high. Try again.');
                askGuess();
            } else {
                console.log(`Congratulations! You guessed the right number in ${guessCount} guesses!`);
                askPlayAgain();
            }
        });
    }

    askGuess();
}

function startReverseGame() {
    console.log("Think of a number between 1 and 100, and I'll try to guess it.");
    let low = 1;
    let high = 100;

    function computerGuess() {
        if (low > high) {
            console.log("There seems to be a contradiction in your answers. Let's start over.");
            askPlayAgain();
            return;
        }

        const guess = Math.floor((low + high) / 2);
        readline.question(`Is your number ${guess}? Type 'yes' if correct, 'higher' if your number is greater, and 'lower' if your number is smaller: `, (answer) => {
            if (answer.toLowerCase() === 'yes') {
                console.log(`Hooray! I've guessed your number. It was ${guess}!`);
                askPlayAgain();
            } else if (answer.toLowerCase() === 'higher') {
                low = guess + 1;
                computerGuess();
            } else if (answer.toLowerCase() === 'lower') {
                high = guess - 1;
                computerGuess();
            } else {
                console.log('Please type "yes", "higher", or "lower".');
                computerGuess();
            }
        });
    }

    computerGuess();
}

function askPlayAgain() {
    readline.question('Do you want to play again? (yes/no): ', answer => {
        if (answer.toLowerCase() === 'yes') {
            chooseGameMode(); // Let the user choose the game mode again
        } else {
            console.log('Thank you for playing!');
            readline.close();
        }
    });
}

chooseGameMode(); // Start by choosing the game mode
