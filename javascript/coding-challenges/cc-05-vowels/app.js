//* JS-CC-005 : Vowels in a string

//? Create a function that'll return an integer of the number of vowels found in a string.

const textBox = document.querySelector("#input");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");

btn.addEventListener("click", () => {
    let text = textBox.value;
    let count = 0;
    for (letter of text.split("")) {
        switch (letter.toLowerCase()) {
            case "a":
            case "e":
            case "u":
            case "ü":
            case "ı":
            case "i":
            case "o":
            case "ö":
                count++;
        }
    }
    result.innerText = count;
});
