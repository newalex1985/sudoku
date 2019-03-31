module.exports = function solveSudoku(matrix) {

    // return no solution, because there is no solution, but
    // need to show the decision process
    return matrix; 

    var matrixLocal = matrix.slice();

    var zeroArr;

    var countTrue;

    // for debug, delete later
    var megaCount = 5000;


    do {

        var indexLineArr = maxLineArr(matrixLocal);

        do {

            countTrue = 0;

            for (var i = 0; i < indexLineArr.length; i++) {
                zeroArr = searchZero(indexLineArr[i], matrixLocal);

                if (combo(indexLineArr[i], zeroArr, matrixLocal)) {
                    countTrue++;
                }
            }

        } while (countTrue);


        var numMaxArr = maxNumEntry(matrixLocal);

        for (var j = 0; j < numMaxArr.length; j++) {

            //------
        do {
            var template = getTemplate();

            for (var k = 0; k < 9; k++) {
                for (var m = 0; m < 9; m++) {
                    if (matrixLocal[k][m] == numMaxArr[j][0]) {
                        template = crossOf(k, m, matrixLocal, template);
                    }
                }
            }

            var oneSolution = findZero(template);
            if (oneSolution.length == 1) {
                setNum(oneSolution, matrixLocal, numMaxArr[j][0]);
            }

        } while (oneSolution.length == 1);
        //-----------

        }

        // for debug, delete later
        megaCount --;
                                        // for debug, delete later
    } while (!isAllDone(matrixLocal) && megaCount);


    return matrixLocal;

}



function isAllDone(matrixLocal) {

    var result = true;

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrixLocal[i][j] == 0) {
                result = false;
                return result;
            }
        }
    }

    return result;
}

function setNum(oneSolution, matrixLocal, number) {

    matrixLocal[3 * oneSolution[0][0] + oneSolution[0][2]][3 * oneSolution[0][1] + oneSolution[0][3]] = number;

}


function findZero(template) {

    var count;
    var findZeroArr = [];
    var findI;
    var findJ;

    for (var k = 0; k < 3; k++) {
        for (var m = 0; m < 3; m++) {
            count = 0
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {

                    if (template[3 * k + i][3 * m + j] == 0) {
                        count++;
                        findI = i;
                        findJ = j;
                    }


                }
            }

            if (count == 1) {
                findZeroArr.push([k, m, findI, findJ]);
            }

        }
    }

    return findZeroArr.slice();

}

function crossOf(k, m, matrixLocal, template) {

    for (var i = 0; i < 9; i++) {
        template[k][i] = 1;
        template[i][m] = 1;
    }

    for (var k1 = 0; k1 < 3; k1++) {
        for (var m1 = 0; m1 < 3; m1++) {
            template[3 * parseInt(k / 3) + k1][3 * parseInt(m / 3) + m1] = 1;
        }
    }

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrixLocal[i][j] != 0) {
                template[i][j] = 1;
            }
        }
    }

    return template.slice();
}

function getTemplate() {

    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

function maxNumEntry(matrixLocal) {
    var numArr = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]];

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrixLocal[i][j] != 0) {
                numArr[matrixLocal[i][j] - 1][1]++;
            }
        }
    }

    var temp;

    for (i = 0; i < numArr.length; i++) {
        for (j = i + 1; j < numArr.length; j++) {
            if (numArr[j][1] > numArr[i][1]) {
                temp = numArr[i];
                numArr[i] = numArr[j];
                numArr[j] = temp;
            }
        }
    }

    return numArr.slice();

}

function combo(indexArr, zero, matrixLocal) {

    var solve = false;

    var coincidence;
    var varians = [];
    var numEqualLine;
    var numEqualSquare;

    for (var n = 0; n < zero[1].length; n++) {
        varians[n] = zero[0].slice();
    }


    for (var i = 0; i < zero[1].length; i++) {
        for (var j = 0; j < zero[0].length; j++) {

            coincidence = false;

            for (var l = 0; l < 9; l++) {

                if (indexArr[0] == 1) {
                    numEqualLine = matrixLocal[l][zero[1][i]];
                } else {
                    numEqualLine = matrixLocal[zero[1][i]][l];
                }

                if (numEqualLine == zero[0][j]) {
                    coincidence = true;
                    varians[i].splice(varians[i].indexOf(zero[0][j]), 1);
                }
            }

            if (coincidence) {
                continue;
            }


            for (var k = 0; k < 3; k++) {
                for (var m = 0; m < 3; m++) {

                    if (indexArr[0] == 1) {
                        numEqualSquare = matrixLocal[3 * parseInt(indexArr[1] / 3) + k][3 * parseInt(zero[1][i] / 3) + m];
                    } else {
                        numEqualSquare = matrixLocal[3 * parseInt(zero[1][i] / 3) + m][3 * parseInt(indexArr[1] / 3) + k];
                    }

                    if (numEqualSquare == zero[0][j]) {
                        //coincidence = true;
                        varians[i].splice(varians[i].indexOf(zero[0][j]), 1);
                    }

                }
            }

            /*
            if (coincidence) {
                continue;
            }
            */
        }
    }


    for (var z = 0; z < varians.length; z++) {
        if (varians[z].length == 1) {

            if (indexArr[0] == 1) {
                matrixLocal[indexArr[1]][zero[1][z]] = varians[z][0];
            } else {
                matrixLocal[zero[1][z]][indexArr[1]] = varians[z][0];
            }

            solve = true;
        }
    }

    return solve;

}


function searchZero(indexArr, matrixLocal) {

    var positionsZero = [];
    var numbersZero = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var numEqual;

    for (var i = 0; i < 9; i++) {

        if (indexArr[0] == 1) {
            numEqual = matrixLocal[indexArr[1]][i];
        } else {
            numEqual = matrixLocal[i][indexArr[1]];
        }

        if (numEqual == 0) {
            positionsZero.push(i);
        } else {
            numbersZero.splice(numbersZero.indexOf(numEqual), 1);
        }
    }

    return [numbersZero.slice(), positionsZero.slice()];
}


function maxLineArr(matrixLocal) {

    var count;

    var allArr = [];


    for (var i = 0; i < 9; i++) {
        count = 0;
        for (var j = 0; j < 9; j++) {
            if (matrixLocal[i][j] != 0) {
                count++;
            }
        }

        allArr.push([1, i, count]);


    }

    for (var i = 0; i < 9; i++) {
        count = 0;
        for (var j = 0; j < 9; j++) {
            if (matrixLocal[j][i] != 0) {
                count++;
            }
        }

        allArr.push([0, i, count]);


    }

    var temp;

    for (i = 0; i < allArr.length; i++) {
        for (j = i + 1; j < allArr.length; j++) {
            if (allArr[j][2] > allArr[i][2]) {
                temp = allArr[i];
                allArr[i] = allArr[j];
                allArr[j] = temp;
            }
        }
    }

    return allArr.slice();

}
