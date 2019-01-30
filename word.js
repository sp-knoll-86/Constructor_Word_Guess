var Letter = require("./letter.js");

var wordCategories = [{
    "name": "ALL",
    "wordList": ["mahomes", "football", "coding", "soccer", "bootcamp"]
}];

var Word = function () {
    this.letters = [];
    this.guessWord = "";
    this.wordBank = wordCategories[0].wordList;

    this.randomWord = function () {
        var randomEntry = Math.floor(Math.random() * this.wordBank.length);

        this.guessWord = this.wordBank[randomEntry].toUpperCase();

        for (i = 0; i < this.guessWord.length; i++) {
            this.letters.push(new Letter(this.guessWord[i]));
        }
    };

    this.makeGuess = function (character) {
        var found = false;

        for (i = 0; i < this.letters.length; i++) {
            var letterFound = this.letters[i].guessLetter(character);
            if (letterFound) {
                found = true;
            };
        }
        return found;
    };
    this.wordSolved = function () {
        for (i = 0; i < this.letters.length; i++) {
            if (this.letters[i].isGuessed === false) {
                return false;
            }
        }
        return true;
    }
};

Word.prototype.toString = function () {
    var newWord = "";
    for (i = 0; i < this.letters.length; i++) {
        newWord = newWord + " " + this.letters[i];
    }
    newWord = newWord + "\n";
    return newWord;
};

module.exports = Word;