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