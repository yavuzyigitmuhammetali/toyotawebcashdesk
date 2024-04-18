/**
 * Compares two elements in descending order based on the specified orderBy parameter.
 * @param {Object} a - The first element to compare.
 * @param {Object} b - The second element to compare.
 * @param {string} orderBy - The property to order by.
 * @returns {number} - Returns -1 if a should come before b, 1 if b should come before a or 0 if they are equal.
 */
function descendingComparator(a, b, orderBy) {
    if (orderBy === 'cart.length') {
        if (b.cart.length < a.cart.length) {
            return -1;
        }
        if (b.cart.length > a.cart.length) {
            return 1;
        }
        return 0;
    }

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

/**
 * Returns a comparator function based on the order and orderBy parameters.
 * @param {string} order - The order of sorting ('asc' for ascending, 'desc' for descending).
 * @param {string} orderBy - The property to order by.
 * @returns {Function} - The comparator function.
 */
export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Sorts the array in a stable way using the provided comparator function.
 * @param {Array} array - The array to be sorted.
 * @param {Function} comparator - The comparator function to determine the order.
 * @returns {Array} - The sorted array.
 */
export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
