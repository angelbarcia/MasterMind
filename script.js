class Move { // Immutable
    #guess;
    #message;

    constructor(guess, message) {
        this.#guess = guess;
        this.#message = message;
    }

    get guess() {
        return this.#guess;
    }

    get message() {
        return this.#message;
    }
}
class View {
    constructor() {
        this.counter = document.querySelector("#counter");
        this.attempts = document.querySelector("#attempts");
        this.lives = document.querySelector("#lives");
        this.guess = document.querySelector("#guess");
        this.level = document.querySelector(".level");
        this.moves = $("#moves");
    }
}

class Game {
    #secret;
    #level;
    #lives;
    #attempts;
    #maxAttempts;
    #moves;
    #counter;

    constructor(view) {
        this.#level = 3;
        this.#secret = this.create_secret(this.level);
        this.#lives = 3
        this.#maxAttempts = 10
        this.#attempts = 10
        this.#moves = []
        this.#counter = 60;
        this.view = view;
        this.countDown = this.countDown.bind(this);

        setInterval(this.countDown, 1000);
    }

    countDown(){
        this.#counter--;
        this.view.counter.innerHTML = this.#counter;
        if (this.#counter < 0){
            this.#lives--;
            this.view.lives.innerHTML = this.#lives;
            this.initializeGame();
        }
    }

    initializeGame(){
        this.#secret = this.create_secret(this.level);
        this.#attempts = this.#maxAttempts;
        this.#counter = 60;
        this.view.attempts.innerHTML = this.#attempts;
        this.view.counter.innerHTML = this.#counter;
        this.view.level.innerHTML = this.#level;
        this.view.moves.empty();
    }

    play(){
        this.#attempts--;
        this.view.attempts.innerHTML = this.#attempts;
        if (this.#attempts <= 0){
            this.#lives--;
            this.view.lives.innerHTML = this.#lives;
            this.initializeGame();
            this.#moves = [];
        }
        const guess = Number(this.view.guess.value);
        if (guess === this.#secret){
            this.#lives++;
            this.#level++;
            this.#maxAttempts += 2;
            this.#moves = [];
            this.initializeGame();
        }
        const message = this.evaluate(guess);
        this.#moves.push(new Move(guess, message));
        this.view.moves.empty();
        for (let move of this.#moves) {
            this.view.moves.append(`<tr><td>${move.guess}</td><td>${move.message}</td></td></tr>`);
        }
    }

    evaluate(guess){
        const guessAsString = guess.toString();
        const secretAsString = this.#secret.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i=0;i<secretAsString.length;i++){
            const s = secretAsString[i];
            for (let j=0;j<guessAsString.length;j++){
                const g = guessAsString[j];
                if (s === g){
                    if (i === j){
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        if (perfectMatch === 0 && partialMatch === 0){
            return "No match";
        }
        let message = "";
        if (partialMatch > 0){
            message = `-${partialMatch}`;
        }
        if (perfectMatch > 0){
            message = `${message}+${perfectMatch}`;
        }
        return message;
    }

    get level() { // property
        return this.#level;
    }

    get counter() { // property
        return this.#counter;
    }

    create_secret(level = 3) {
        if (level > 10 || level < 3)
            throw "Game level should be between 3 and 10"
        let digits = []
        digits.push(this.#create_random_digit(1, 9))
        // 3615
        while (digits.length < level) {
            let candidate = this.#create_random_digit(0, 9);
            if (digits.includes(candidate)) continue;
            digits.push(candidate);
        }
        return this.#get_number(digits);
    }

    #create_random_digit(lower = 0, upper = 9) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    #get_number(digits) {
        let number = 0; // 3615
        for (const digit of digits) {
            number = 10 * number + digit;
        }
        return number;
    }
}

const view = new View();
const game = new Game(view);