/**
 * Filters an array of objects based on the first letter of a specified property (name) falling within a given alphabetical range.
 * 
 * @param {Object[]} data - The array of objects to be filtered.
 * @param {string} range - The alphabetical range to filter by, formatted as "startLetter-endLetter".
 * @returns {Object[]} The filtered array of objects.
 */
export function filterNamesByRange(data, range) {
    // Define the alphabet including special characters specific to Turkish.
    const alphabet = "A,B,C,Ç,D,E,F,G,Ğ,H,I,İ,J,K,L,M,N,O,Ö,P,Q,R,S,Ş,T,U,Ü,V,W,X,Y,Z".split(",");
    // Split the range into start and end letters.
    const [start, end] = range.split("-");
    // Find the index of the start and end letters in the alphabet.
    const startIndex = alphabet.indexOf(start);
    const endIndex = alphabet.indexOf(end);

    // Check for invalid range input.
    if (startIndex === -1 || endIndex === -1) {
        console.error("Invalid range!");
        return [];
    }

    // Filter the data based on the first letter of the name property falling within the specified range.
    return data.filter(item => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        return alphabet.indexOf(firstLetter) >= startIndex && alphabet.indexOf(firstLetter) <= endIndex;
    });
}

/**
 * Groups an array of objects based on the first letter of a specified property (name) into predefined alphabetical groups.
 * 
 * @param {Object[]} data - The array of objects to be grouped.
 * @returns {Object[][]} An array of object arrays, each representing a group of objects whose names fall within the same alphabetical group.
 */
export function filterDataByAlphabetGroups(data) {
    // Define the alphabetical groups.
    const alphabetGroups = {
        "A-B-C-Ç": [],
        "D-E-F-G": [],
        "Ğ-H-I-İ": [],
        "J-K-L-M": [],
        "N-O-Ö-P": [],
        "Q-R-S-Ş": [],
        "T-U-Ü-V": [],
        "W-X-Y-Z": []
    };

    // Iterate over the data and assign each item to the appropriate group based on the first letter of the name property.
    data.forEach(item => {
        const firstLetter = item.name.charAt(0).toUpperCase();
        for (let group in alphabetGroups) {
            if (group.includes(firstLetter)) {
                alphabetGroups[group].push(item);
                break;
            }
        }
    });

    // Return the values of the alphabetGroups object as an array of arrays.
    return Object.values(alphabetGroups);
}