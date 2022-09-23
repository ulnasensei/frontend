const input = document.querySelector(".input");
const topScreen = document.querySelector(".top-screen");
const btnContainer = document.querySelector(".button-container");

let numberOne, numberTwo, operator;

let numberOneDone = false;

let floating = false;

btnContainer.addEventListener("click", (e) => {
    if (e.target.id == "n0") {
        input.innerText += "0";
    } else if (e.target.id == "n1") {
        input.innerText += "1";
    } else if (e.target.id == "n2") {
        input.innerText += "2";
    } else if (e.target.id == "n3") {
        input.innerText += "3";
    } else if (e.target.id == "n4") {
        input.innerText += "4";
    } else if (e.target.id == "n5") {
        input.innerText += "5";
    } else if (e.target.id == "n6") {
        input.innerText += "6";
    } else if (e.target.id == "n7") {
        input.innerText += "7";
    } else if (e.target.id == "n8") {
        input.innerText += "8";
    } else if (e.target.id == "n9") {
        input.innerText += "9";
    } else if (e.target.id == "float" && !floating) {
        input.innerText += ".";
        floating = true;
    } else if (e.target.id == "add" && !numberOneDone && input.innerText) {
        numberOne = Number(input.innerText);
        input.innerText = "";
        operator = "add";
        topScreen.innerText += numberOne + "+";
        numberOneDone = true;
        floating = false;
    } else if (e.target.id == "divide" && !numberOneDone && input.innerText) {
        numberOne = Number(input.innerText);
        input.innerText = "";
        operator = "divide";
        topScreen.innerText += numberOne + "/";
        numberOneDone = true;
        floating = false;
    } else if (e.target.id == "subtract" && !numberOneDone && input.innerText) {
        numberOne = Number(input.innerText);
        input.innerText = "";
        operator = "subtract";
        topScreen.innerText += numberOne + "-";
        numberOneDone = true;
        floating = false;
    } else if (e.target.id == "multiply" && !numberOneDone && input.innerText) {
        numberOne = Number(input.innerText);
        input.innerText = "";
        operator = "multiply";
        topScreen.innerText += numberOne + "x";
        numberOneDone = true;
        floating = false;
    } else if (e.target.id == "equal" && numberOneDone && input.innerText) {
        numberTwo = Number(input.innerText);
        topScreen.innerText = "";
        numberOneDone = false;
        floating = false;
        switch (operator) {
            case "add":
                input.innerText = numberOne + numberTwo;
                break;
            case "divide":
                input.innerText = numberOne / numberTwo;
                break;
            case "multiply":
                input.innerText = numberOne * numberTwo;
                break;
            case "subtract":
                input.innerText = numberOne - numberTwo;
                break;
        }
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
