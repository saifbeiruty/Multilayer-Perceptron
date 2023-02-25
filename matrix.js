class Matrix {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.data = [];

        for (let r = 0; r < this.row; r++) {
            this.data[r] = [];
            for (let c = 0; c < this.column; c++) {
                this.data[r][c] = 0;
            }
        }
    }

    randomize () {
        for (let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.column; c++) {
                // Numbers between -1 and 1
                this.data[r][c] = Math.random() * 2 - 1;
            }
        }
    }

    static transpose (matrix) {
        let transposedMatrix = new Matrix (matrix.column, matrix.row);
        for (let r = 0; r < matrix.row; r++) {
            for(let c = 0; c < matrix.column; c++) {
                transposedMatrix.data[c][r] = matrix.data[r][c];
            }
        }
        return transposedMatrix;
    }
    
    // Changes the input given to the feedForward algorithm to a Matrix;
    static fromArray (arr) {
        let m = new Matrix (arr.length, 1);
        for (let r = 0; r < arr.length; r++) {
            m.data[r][0] = arr[r];
        }
        return m;
    }

    toArray() {
        let arr = [];
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.column; c++) {
                arr.push(this.data[r][c]);
            }
        }
        return arr;
    }

    static substract (a, b) {
        // Assuming a and b are always the same size
        let result = new Matrix(a.row, a.column);
        for (let r = 0; r < result.row; r++) {
            for (let c = 0; c < result.column; c++) {
                result.data[r][c] = a.data[r][c] - b.data[r][c];
            }
        }
        return result;
    }

    static multiply (m1, m2) {
    // Matrix product
        if(m1.data[0].length === m2.data.length) {
            let result = new Matrix(m1.row, m2.column);
            for (let r = 0; r < result.row; r++) {
                for(let c = 0; c < result.column; c++) {
                    let sum = 0;
                    for (let k = 0; k < m1.column; k++) {
                        sum += m1.data[r][k] * m2.data[k][c];
                    }
                    result.data[r][c] = sum;
                }
            }
            return result;
        
        } else {
            console.log('this would not work');
            return undefined;
        }
    }

    multiply (n) {
        if(n instanceof Matrix) {
            for (let r = 0; r < this.row; r++) {
                for(let c = 0; c < this.column; c++) {
                    this.data[r][c] *= n.data[r][c];
                }
            }
        } else {
        // Scalar Multiplication
            for (let r = 0; r < this.row; r++) {
                for(let c = 0; c < this.column; c++) {
                    this.data[r][c] *= n;
                }
            }
        }
    }

    add (n) {
        if (n instanceof Matrix) {
            for (let r = 0; r < this.row; r++) {
                for(let c = 0; c < this.column; c++) {
                    this.data[r][c] += n.data[r][c];
                }
            }
        } else {
            for (let r = 0; r < this.row; r++) {
                for(let c = 0; c < this.column; c++) {
                    this.data[r][c] += n
                }
            }
        }
    }

    static map (matrix, func) {
        let result = new Matrix(matrix.row, matrix.column);
        for (let r = 0; r < matrix.row; r++) {
            for(let c = 0; c < matrix.column; c++) {
                let val = matrix.data[r][c];
                result.data[r][c] = func(val);
            }
        }
        return result;
    }

    map(func) {
        for (let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.column; c++) {
                let result = func(this.data[r][c]);
                this.data[r][c] = result;
            }
        }
    }
}

module.exports = Matrix;