const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(input, hidden, output) {
        this.input = input;
        this.hidden = hidden;
        this.output = output;

        //Creating the weights matrix
        this.weightsInputHidden = new Matrix (this.hidden, this.input);
        this.weightsHiddenOutput = new Matrix (this.output, this.hidden);

        // Randomizing the weights matrix
        this.weightsInputHidden.randomize();
        this.weightsHiddenOutput.randomize();

        this.biasInputHidden = new Matrix (this.hidden, 1);
        this.biasHiddenOutput = new Matrix (this.output, 1);
        this.biasInputHidden.randomize();
        this.biasHiddenOutput.randomize();
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

}