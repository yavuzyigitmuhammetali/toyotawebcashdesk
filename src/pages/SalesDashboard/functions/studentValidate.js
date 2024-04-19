/**
 * Checks the validity of an identity number.
 * @param {string} inputValue - The identity number to validate.
 * @returns {boolean} - True if the identity number is valid, false otherwise.
 */
export function checkIdentityNumber(inputValue) {
    if (inputValue.length !== 11) {
        return false;
    }

    if (!/^\d+$/.test(inputValue)) {
        return false;
    }

    let total = 0;
    for (let i = 0; i < 10; i++) {
        total += parseInt(inputValue[i]);
    }

    const onesDigit = total % 10;

    return onesDigit === parseInt(inputValue[10]);
}