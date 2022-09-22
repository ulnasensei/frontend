let roman = Number(prompt("Enter a number:")); // MCMXCIV

const parser = (number) => {
    const romanNumbers = {
        1: "I",
        4: "IV",
        5: "V",
        9: "IX",
        10: "X",
        40: "XL",
        50: "L",
        90: "XC",
        100: "C",
        400: "CD",
        500: "D",
        900: "CM",
        1000: "M",
        arr: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    };
    let result = "";
    for (let i = 0; i < romanNumbers.arr.length; i++) {
        while (number >= romanNumbers.arr[i]) {
            number -= romanNumbers.arr[i];
            result += romanNumbers[romanNumbers.arr[i]];
        }
    }
    return result;
};

alert(parser(roman));
