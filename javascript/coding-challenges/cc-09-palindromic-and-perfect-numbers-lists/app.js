const palBtn = document.querySelector("#palBtn");
const perfBtn = document.querySelector("#perfBtn");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
const palindromeTextArea = document.querySelector("#palindrome");
const perfectNumberTextArea = document.querySelector("#perfectNumber");

palBtn.addEventListener("click", () => {
    palindromeTextArea.value = "";
    const palindromes = getPalindrome(start.value, end.value);

    palindromes.forEach((item) => {
        palindromeTextArea.value += `${item}\n`;
    });
});
perfBtn.addEventListener("click", () => {
    perfectNumberTextArea.value = "";
    const perfectNumbers = getPerfectNumber(start.value, end.value);

    perfectNumbers.forEach((item) => {
        perfectNumberTextArea.value += `${item}\n`;
    });
});

const getPalindrome = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) {
        if (i < 10) {
            result.push(i);
        } else {
            const reverse = String(i).split("").reverse().join("");
            if (Number(reverse) == i) result.push(i);
        }
    }
    return result;
};

const getPerfectNumber = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) {
        const dividers = [];

        for (let j = 1; j < i; j++) {
            if (i % j == 0) dividers.push(j);
        }
        const dividerSum = dividers.reduce((total, item) => {
            return total + item;
        }, 0);
        if (dividerSum === i) result.push(i);
    }
    return result;
};
