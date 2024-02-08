export function checkIdentityNumber(inputValue) {
    if (inputValue.length !== 11) {
        return false;
    }

    if (!/^\d+$/.test(inputValue)) {
        return false;
    }

    var total = 0;
    for (var i = 0; i < 10; i++) {
        total += parseInt(inputValue[i]);
    }

    var onesDigit = total % 10;

    if (onesDigit === parseInt(inputValue[10])) {
        return true;
    } else {
        return false;
    }
}