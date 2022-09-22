let input = prompt("Enter a string to reverse: ").trim();

function reverseWords(str) {
    return str.includes(" ") ? str.split(" ").reverse().join(" ") : str;
}

alert(reverseWords(input));
