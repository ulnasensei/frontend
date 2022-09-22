//* JS-CC-06 : Draw Diamond with Star Character

//? The purpose of this coding challenge is to draw an empty diamond figure (only the outline) into textarea field, using star character (*). Take the number of rows from user and draw the diamond figure accordingly. Add event listener to the input field and call the function when the user enters or changes the value.

//* Expected Outcome (input = 5)
//    *
//   * *
//  *   *
// *     *
//*       *
// *     *
//  *   *
//   * *
//    *

const input = document.querySelector("#number");
const textarea = document.querySelector("#result");

input.addEventListener("change", () => {
    textarea.innerText = "";
    const number = input.value;
    let space = 0;

    // top
    for (let i = 1, j = 1; i <= number; i++) {
        textarea.innerText += " ".repeat(number - i);
        textarea.innerText += "*";

        if (i > 1) {
            textarea.innerText += " ".repeat(j);
            space = j;
            j += 2;
            textarea.innerText += "*";
        }

        textarea.innerText += "\n";
    }
    // bottom
    for (let i = number - 1, j = space - 2; i >= 1; i--) {
        textarea.innerText += " ".repeat(number - i);
        textarea.innerText += "*";

        if (i > 1) {
            textarea.innerText += " ".repeat(j);
            space = j;
            j -= 2;
            textarea.innerText += "*";
        }

        textarea.innerText += "\n";
    }
});
