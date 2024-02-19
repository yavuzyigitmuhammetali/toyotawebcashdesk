import React from "react";

const KeyboardContext = React.createContext(undefined);

const KeyboardProvider = ({children}) => {
    const [value, setValue] = React.useState({});
    const [id, setId] = React.useState("")
    const enter = React.useRef(null)

    const handleEnter = () => {
        enter?.current?.click();
    };

    React.useEffect(() => {
        if (!value[id]) {
            const updatedState = {...value};
            updatedState[id] = "";
            setValue(updatedState);
        }
    }, [id]);
    const onChangeValue = (updatedValue) => {
        if (id) {
            const updatedState = {...value};
                updatedState[id] = updatedValue;
            setValue(updatedState);
        }
    };
    const handleValue = (updatedValue) => {
        if (id) {
            const updatedState = {...value};
                updatedState[id] = value[id] + updatedValue;
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
    }


    const handleElementClick = (e) => {
        setId(e.target.id);
    };




    return (
        <KeyboardContext.Provider
            value={{
                handleValue,
                handleElementClick,
                handleDelete,
                onChangeValue,
                handleEnter,
                value,
                id,
                enter
            }}
        >
            {children}
        </KeyboardContext.Provider>
    );
};

export default KeyboardContext;
export {KeyboardProvider};
