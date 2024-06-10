import React, {useCallback, useRef, useState} from "react";

const KeyboardContext = React.createContext(undefined);

const KeyboardProvider = ({children}) => {
    const [value, setValue] = useState({});
    const [id, setId] = useState("");
    const enterRef = useRef(null);

    const clearValues = useCallback(() => {
        setValue({});
        setId("");
        enterRef.current = null;
    }, []);

    const handleEnter = useCallback(() => {
        enterRef.current?.click();
    }, []);

    const onChangeValue = useCallback((event) => {
        const {id: inputId, value: inputValue} = event.target;
        setValue((prevValue) => ({
            ...prevValue,
            [inputId ? inputId : id]: inputValue,
        }));
    }, [id]);

    const setChangedValue = useCallback((newVal) => {
        setValue((prevValue) => ({
            ...prevValue,
            [id]: newVal,
        }));
    }, [id]);

    const handleValue = useCallback((updatedValue) => {
        setValue((prevValue) => ({
            ...prevValue,
            [id]: (prevValue[id] || "") + updatedValue,
        }));
    }, [id]);

    const handleDelete = useCallback(() => {
        setValue((prevValue) => {
            const updatedState = {...prevValue};
            if (updatedState[id]) {
                if (typeof updatedState[id] === 'string') {
                    updatedState[id] = updatedState[id].slice(0, -1);
                } else if (typeof updatedState[id] === 'number') {
                    let numStr = updatedState[id].toString();
                    numStr = numStr.slice(0, -1);
                    updatedState[id] = numStr === '' ? 0 : Number(numStr);
                }
            }
            return updatedState;
        });
    }, [id]);

    const handleElementFocus = useCallback((event) => {
        const {id: elementId, value: elementValue} = event.target;
        setValue((prevValue) => ({
            ...prevValue,
            [elementId]: elementValue ?? "",
        }));
        setId(elementId);
    }, []);

    const contextValue = {
        handleValue,
        handleDelete,
        onChangeValue,
        handleEnter,
        handleElementFocus,
        setChangedValue,
        clearValues,
        value,
        id,
        enterRef,
    };

    return (
        <KeyboardContext.Provider value={contextValue}>
            {children}
        </KeyboardContext.Provider>
    );
};

export default KeyboardContext;
export {KeyboardProvider};
