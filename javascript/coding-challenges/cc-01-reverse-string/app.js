//! Write a function that takes an array of characters and reverses the letters in place.
//? Examples:
//?     reverse("Clarusway Rocks!") ➞ !skcoR yawsuralC
//?     reverse("Happy") ➞ yppaH

let input = prompt("Enter a string to reverse: ");

function reverse(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

alert(reverse(input));
