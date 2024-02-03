import React from "react";

const KeyboardContext = React.createContext();

const KeyboardProvider = ({children}) => {
    const [value, setValue] = React.useState({});
    const [id, setId] = React.useState("")
    const htmlElement = document.getElementById(id);


    const handleValue = (updatedValue) => {
        if (id) {
            const updatedState = {...value};
            updatedState[id] = htmlElement.value + updatedValue;
            setValue(updatedState);
        }
    };
    const handleDelete = () => {
        const updatedState = {...value};
        if (updatedState[id]) {
            updatedState[id] = htmlElement.value.slice(0, -1);
            setValue(updatedState);
        }
    }
    React.useEffect(() => {
        if (htmlElement) {
            htmlElement.value = value[id];
        }
    }, [value]);

    const handleElementClick = (e) => {
        setId(e.target.id);
    };


    return (
        <KeyboardContext.Provider
            value={{
                handleValue,
                handleElementClick,
                handleDelete,
                value,
                id
            }}
        >
            {children}
        </KeyboardContext.Provider>
    );
};

export default KeyboardContext;
export {KeyboardProvider};
