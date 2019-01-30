var inquirer = require("inquirer");
var Word = require("./word.js");

beginGame();

function beginGame() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "Ready?",
        choices: ["Yes", "Let's begin"]
    }]).then(function (answers) {
        if (answers.choices === "Yes" || "Let's begin") {
            var playGame = function () {
                var newWord = new Word();
                var guesses = 7;
                var guessedLetters = [];

                function displayWord(ele) {
                    console.log(ele + "");
                }
                newWord.randomWord();
                console.log("\n NEW GAME \n");
                displayWord(newWord);

                var getLetter = function () {
                    if (guesses > 0) {
                        inquirer.prompt([{
                            type: "input",
                            message: "Guess a letter",
                            name: "letter"
                        }]).then(function (answers) {
                            if (answers.letter.length === 1) {
                                if (guessedLetters.indexOf(answers.letter) === -1) {
                                    guessedLetters.push(answers.letter);

                                    var correct = newWord.makeGuess(answers.letter);

                                    if (correct) {
                                        console.log("\n CORRECT \n");
                                    } else {
                                        guesses--;
                                        console.log("\n INCORRECT \n");
                                    };

                                    if (guesses === 1) {
                                        console.log(guesses + " guesses remaining \n");
                                    } else {
                                        console.log(guesses + " guesses remaining \n");
                                    }

                                    if (guesses != 0) {
                                        displayWord(newWord);
                                    }

                                    if (!newWord.wordSolved()) {
                                        getLetter();
                                    } else {
                                        console.log("\n CORRECT! NEXT WORD \N");
                                        playGame();
                                    }
                                } else {
                                    console.log("\n Already guessed! Try again \n");
                                    getLetter();
                                }
                            } else {
                                console.log("\n Only one letter, please. Try again \n");
                                getLetter();
                            }
                        });
                    } else {
                        console.log("\n GAME OVER \n");
                        console.log("The answer was" + newWord.guessWord + ". Let's play again \n");
                        playGame();
                    }
                }
                getLetter();
            };
            playGame();
        }
    })
}