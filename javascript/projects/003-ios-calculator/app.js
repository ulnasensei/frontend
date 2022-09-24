const input = document.querySelector(".input");
const topScreen = document.querySelector(".top-screen");
const btnContainer = document.querySelector(".button-container");

let numberOne, numberTwo, operator;

let numberOneDone = false;

let floating = false;

const operators = {
    add: ["+", "+"],
    subtract: ["-", "-"],
    divide: ["/", "÷"],
    multiply: ["*", "x"],
};

btnContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("number")) {
        input.innerText += e.target.innerText;
    } else if (e.target.id == "float" && !floating) {
        input.innerText += ".";
        floating = true;
    } else if (e.target.classList.contains("operator")) {
        numberOne = Number(input.innerText);
        input.innerText = "";
        operator = e.target.id;
        topScreen.innerText += numberOne + operators[operator][1];
        numberOneDone = true;
        floating = false;
    } else if (e.target.id == "equal" && numberOneDone && input.innerText) {
        numberTwo = Number(input.innerText);
        topScreen.innerText = "";
        numberOneDone = false;
        floating = false;
        input.innerText = eval(`${numberOne}${operators[operator][0]}${numberTwo}`);
    } else if (e.target.id == "percentage" && input.innerText) {
        input.innerText = Number(input.innerText) / 100;
    } else if (e.target.id == "pm" && input.innerText) {
        if (input.innerText.includes("-")) input.innerText = input.innerText.replace("-", "");
        else input.innerText = "-" + input.innerText;
    } else if (e.target.id == "ac") {
        input.innerText = "";
        topScreen.innerText = "";
        numberOneDone = false;
        floating = false;
    }
});
