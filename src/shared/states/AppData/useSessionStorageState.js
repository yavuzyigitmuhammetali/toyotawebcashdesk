import React from "react";

function useSessionStorageState(key, defaultValue) {
    const [state, setState] = React.useState(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    const setValue = (newValue) => {
        setState(newValue);
        sessionStorage.setItem(key, JSON.stringify(newValue));
    };

    const clearValue = (hardReset = false) => {
        setState(defaultValue);
        if (hardReset) sessionStorage.removeItem(key);
    };

    return [state, setValue, clearValue];
}

export default useSessionStorageState;