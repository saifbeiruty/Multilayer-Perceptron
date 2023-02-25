let Matrix = require('./matrix.js')

//Sigmoid activation function
const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

// Derivative of the sigmoid function
const disigmoid = (y) => {
    return y * ( 1 - y );
}

class NeuralNetwork {
    constructor(input, hidden, output) {

        // Building up the artificial neural network
        this.input = input;
        this.hidden = hidden;
        this.output = output;

        //Creating the weights matrix
        this.weightsInputHidden = new Matrix (this.hidden, this.input);
        this.weightsHiddenOutput = new Matrix (this.output, this.hidden);

        // Randomizing the weights matrix
        this.weightsInputHidden.randomize();
        this.weightsHiddenOutput.randomize();

        // Initializing the bias matrix (Always has 1 column)
        this.biasInputHidden = new Matrix (this.hidden, 1);
        this.biasHiddenOutput = new Matrix (this.output, 1);

        // Randomizing the bias
        this.biasInputHidden.randomize();
        this.biasHiddenOutput.randomize();

        // Learning Rate
        this.lr = 0.1;
    }

    feedForward(inputArray) {
        // Changing the input array to a Matrix
        let inputs = Matrix.fromArray(inputArray);

        // Multiplying the inputs with the weights
        let hidden = Matrix.multiply(this.weightsInputHidden, inputs);

        // Adding the bias to the result
        hidden.add(this.biasInputHidden);

        // Passing the result through the sigmoid function
        hidden.map(sigmoid);

        // Repeat from hidden layer to output;
        let output = Matrix.multiply(this.weightsHiddenOutput, hidden);
        output.add(this.biasHiddenOutput);
        output.map(sigmoid);

        // returning the result
        return output.toArray();
    }

    train (inputArray, targetArray) {
        // We are assuming only 1 hidden layer

        // Before tweaking the weights, what is the expected output

        // Copied this from the feedforward algorithm above
        // Change the inputs to a matrix
        let inputs = Matrix.fromArray(inputArray);
        // Multiplying the inputs with the weights. I X Wih
        let hidden = Matrix.multiply(this.weightsInputHidden, inputs);
        // Adding Bias I X Wih + B.
        hidden.add(this.biasInputHidden);
        // Passing in the results of the matrix in the sigmoid function
        hidden.map(sigmoid);

        // Get the result of the hidden nodes from above and multuply it with the weights between the hidden and the output. H X Who
        let outputs = Matrix.multiply(this.weightsHiddenOutput, hidden);

        // Adding Bias H X Who + B
        outputs.add(this.biasHiddenOutput);
        // Passing in the results of the matrix in the sigmoid function
        outputs.map(sigmoid);


        // Convert the array back to a matrix
        let targets = Matrix.fromArray(targetArray);
        // Calculating the error (Targets - Outputs)
        let outputErrors = Matrix.substract(targets, outputs);
        
        // To find deltaWeights: Learning Rate * (dCost/dSlope) => Learning Rate * (dCost/dGuess)*(dGuess/dSlope)
        // Cost = Sum(Error^2) | Error = (y(real) - guess) | guess = Sigmoid(mx + c) | x is just the input (Can be the hidden layer too when looking at hidden and output)
        // dCost/dGuess = 2 * Error | dGuess/dSlope = derivativeSigmoid * x
        // dCost/dSlope = 2 * Error * derivatveSigmoid * x | 2 can be ignored | derivativeSigmoid is just Sigmoid(1-Sigmoid) Output(1 - Output)
        let gradients = Matrix.map(outputs, disigmoid);
        gradients.multiply(outputErrors);
        gradients.multiply(this.lr);

        // We are finding the new bias here
        this.biasHiddenOutput.add(gradients);

        let hiddenTransposed = Matrix.transpose(hidden);

        let weightDeltas = Matrix.multiply(gradients, hiddenTransposed);

        // We are finding the new weights here
        this.weightsHiddenOutput.add(weightDeltas);

        // Since we are going back we have to transpose. Check math it will make sense
        let weightsHiddenOutputTransposed = Matrix.transpose(this.weightsHiddenOutput);

        // We are finding the errors on the hidden layer.
        
        // Assumung 2 outputs and 2 hidden:
        // i.e. w11 * eOutput1 + w12 * eOutput2 
        // w21 * eOutput1 + w22 * eOutput2 
        let hiddenErrors = Matrix.multiply(weightsHiddenOutputTransposed, outputErrors);

        let hiddenGradient = Matrix.map(hidden, disigmoid);
        hiddenGradient.multiply(hiddenErrors);
        hiddenGradient.multiply(this.lr);

        let inputsTransposed = Matrix.transpose(inputs);
        let wegihtInputHiddenDeltas = Matrix.multiply(hiddenGradient, inputsTransposed);

        this.weightsInputHidden.add(wegihtInputHiddenDeltas);
        this.biasInputHidden.add(hiddenGradient);
    }
}

module.exports = NeuralNetwork;