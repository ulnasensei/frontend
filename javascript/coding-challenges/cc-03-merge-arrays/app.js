A = [12, 14, 16];
B = [11, 13, 17];

function mergeArrays(a, b) {
    if (a.length == 0 && b.length == 0) {
        return "Arrays are empty.";
    } else if (a.length == 0 && b.length) {
        return b;
    } else if (a.length && b.length == 0) {
        return a;
    } else {
        let mergedArray = a.concat(b);
        return mergedArray.sort(function (i, j) {
            return i - j;
        });
    }
}

alert(mergeArrays(A, B));
