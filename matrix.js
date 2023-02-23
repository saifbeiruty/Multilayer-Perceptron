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
                this.data[r][c] = Math.floor(Math.random() * 10)
            }
        }
    }

    transpose () {
        let transposedMatrix = new Matrix (this.column, this.row);
        for (let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.column; c++) {
                transposedMatrix.data[c][r] = this.data[r][c];
            }
        }
        return transposedMatrix;
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
        // Scalar Multiplication
        for (let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.column; c++) {
                this.data[r][c] *= n;
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

    map(func) {
        for (let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.column; c++) {
                let result = func(this.data[r][c]);
                this.data[r][c] = result;
            }
        }
    }
}

const double = (num) => {
    return num * 2;
}

let m1 = new Matrix(2,3)
m1.randomize()
console.table(m1.data)

m1.map(double)
console.table(m1.data)