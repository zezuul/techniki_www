function processData(dataArray) {
    // Store processed data
    let processedData = [];

    for (let i = 0; i < dataArray.length; i++) {
        let dataItem = dataArray[i];

        // null is an assignment value. It can be assigned to a variable as a representation of no value
        // undefined means a variable has been declared but has not yet been assigned a value
        if (dataItem !== null && dataItem !== undefined) {
            let transformedItem = {};
            
            // Flag to track if the item should be added to processedData
            let shouldAdd = true;

            for (let key in dataItem) {
                // hasOwnProperty returns a boolean value indicating whether the object on 
                // which you are calling it has a property with the name of the argument.           
                let value = dataItem[key];
                    if (typeof value === 'string') {
                        value = value.trim();
                    }
                    transformedItem[key.toLowerCase()] = value;

                    // Check if the value is empty or null, update shouldAdd accordingly
                    if (value === '' || value === null) {
                        shouldAdd = false;
                    }
                
            }

            // Add to processedData only if shouldAdd is true
            if (shouldAdd) {
                processedData.push(transformedItem);
            }
        }
    }

    return processedData;
}

module.exports = {
    processData,
};
