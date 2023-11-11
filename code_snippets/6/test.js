const chai = require('chai');
const { processData } = require('./refactoring_2.js');
const expect = chai.expect;

describe('processData', () => {
    it('correctly process and filter data', () => {
        // test data
        const testData = [
            { Name: 'John Doe ', age: '25', city: ' New York ' },
        ];

        // expected result after processing
        const expectedResult = [
            { name: 'John Doe', age: '25', city: 'New York' },
        ];

        const result = processData(testData);

        // assert that the result matches the expected output
        expect(result).to.deep.equal(expectedResult);
    });

    it('handle empty input', () => {
        // test data
        const testData = [];

        // expected result after processing
        const expectedResult = [];

        const result = processData(testData);

        // assert that the result matches the expected output
        expect(result).to.deep.equal(expectedResult);
    });

});
