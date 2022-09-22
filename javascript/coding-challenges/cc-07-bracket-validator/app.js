const str = prompt("Your input:");

const bracketValidator = (input) => {
    const openingBrackets = ["(", "[", "{"];
    const closingBrackets = [")", "]", "}"];
    const brackets = { "(": ")", "[": "]", "{": "}" };
    let stack = [];
    let bracket = "";
    for (character of input) {
        if (openingBrackets.includes(character)) {
            stack.push(character);
        } else if (closingBrackets.includes(character)) {
            bracket = stack.length ? stack.pop() : false;

            if (brackets[bracket] != character) {
                return false;
            }
        }
    }
    return !stack.length ? true : false;
};

console.log(bracketValidator(str));
