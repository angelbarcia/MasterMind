function create_random_digit(lower=0,upper=9){
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
// [3,6,1,5]
function get_number(digits){
    let number = 0; // 3615
    for (const digit of digits){
        number = 10 * number + digit;
    }
    return number;
}

function create_secret(level=3) {
    if (level > 10 || level < 3)
        throw "Game level should be between 3 and 10"
    let digits = []
    digits.push(create_random_digit(1,9))
    // 3615
    while (digits.length < level) {
        let canditate = create_random_digit(0,9);
        if (digits.includes(canditate)) continue;
        digits.push(canditate);
    }
    return get_number(digits);
}

/*attempts and lives*/
    let attempts = 10;
    let lives = 3;
    let level = 1;
function submit(){
    const secret = "224";
    let attemptsElement = document.querySelector(".attemptsNumber");
    let livesElement = document.querySelector(".livesNumber");
    let levelElement = document.querySelector(".levelNumber")
    let guess = document.querySelector("#guess").value;
    let feedback = document.querySelector(".feedbackPhrase");
    let restart = document.querySelector("#restart");
    feedback.innerHTML = "";
        if(guess===secret){
            feedback.innerHTML = "Congratulations! You have passed to the next level";
            level++;
            attempts = 12;
            lives++;
            levelElement.innerHTML = level;
            livesElement.innerHTML = lives;
            attemptsElement.innerHTML = attempts;
        }
        else if (attempts > 0 && lives > 0 && guess !== secret) {
        attempts--;
        attemptsElement.innerHTML = attempts;
        } 
        else if (attempts===0 && lives > 1){
        lives--;
        livesElement.innerHTML = lives;
        attempts = 10;
        attemptsElement.innerHTML = attempts;
            }
        else if(attempts===0 && lives===1){
        lives--;
        livesElement.innerHTML = lives;
        attempts = 0;
        attemptsElement.innerHTML = attempts;
        feedback.innerHTML = "GAME OVER!"
        restart.innerHTML = "Restart?"
        }
        else{
            feedback.innerHTML = "GAME OVER!"
            restart.innerHTML = "Restart?" 
        }

    
    }
