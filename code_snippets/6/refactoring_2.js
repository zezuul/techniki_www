function processData(dataArray) {

    return dataArray
        .filter(dataItem => dataItem !== null && dataItem !== undefined)
        .map(dataItem => {
            // Transform keys to lowercase and trim string values.
            const transformedItem = Object.fromEntries(
                Object.entries(dataItem).map(([key, value]) => [
                    key.toLowerCase(),
                    typeof value === 'string' ? value.trim() : value
                ])
            );

            return transformedItem;
        })
}

module.exports = {
    processData,
};
