import React from "react";

const KeyboardContext = React.createContext(undefined);

const KeyboardProvider = ({children}) => {
    const [value, setValue] = React.useState({});
    const [id, setId] = React.useState("")
    const enterRef = React.useRef(null);

    const clearValues = ()=>{
        setValue({})
    }

    const handleEnter = () => {
        enterRef.current?.click();
    };

    React.useEffect(() => {
        if (id&&!value[id]) {
            const updatedState = {...value};
            updatedState[id] = "";
            setValue(updatedState);
        }
    }, [id]);

    const onChangeValue = (event) => {
        const { id:inputId, value: inputValue } = event.target;
        const updatedState = {...value};
        updatedState[inputId?inputId:id] = inputValue;
        setValue(updatedState);
    };

    const handleValue = (updatedValue) => {
        if (id) {
            const updatedState = {...value};
            updatedState[id] = (value[id] || "") + updatedValue;
            setValue(updatedState);
        }
    };

    const handleDelete = () => {
        const updatedState = {...value};
        if (updatedState[id]) {
            if (typeof updatedState[id] === 'string') {
                updatedState[id] = updatedState[id].slice(0, -1);
            } else if (typeof updatedState[id] === 'number') {
                let numStr = updatedState[id].toString();
                numStr = numStr.slice(0, -1);
                updatedState[id] = numStr === '' ? 0 : Number(numStr);
            }
            setValue(updatedState);
        }
    };


    const handleElementFocus = (event) => {
        const { id: elementId,value: elementValue } = event.target;
        const updatedState = {...value};
        updatedState[elementId] = elementValue;
        setValue(updatedState);
        setId(elementId);
    };




    return (
        <KeyboardContext.Provider
            value={{
                handleValue,
                handleDelete,
                onChangeValue,
                handleEnter,
                handleElementFocus,
                clearValues,
                value,
                id,
                enterRef
            }}
        >
            {children}
        </KeyboardContext.Provider>
    );
};

export default KeyboardContext;
export {KeyboardProvider};
