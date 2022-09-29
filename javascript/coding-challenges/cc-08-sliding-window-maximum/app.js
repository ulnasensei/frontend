const array1 = [10, 5, 2, 7, 8, 7]; //* expected output with k=3: [10, 7, 8, 8]
const array2 = [1, 3, -1, -3, 5, 3, 6, 7]; //* expected output with k=3: [3,3,5,5,6,7]

const k = 3;

const result = [];

for (let i = 0; i <= array1.length - 3; i++) {
    result.push(Math.max(...array1.slice(i, i + 3)));
}
console.log(result);
