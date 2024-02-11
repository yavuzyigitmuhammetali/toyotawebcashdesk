import React from "react";

const NumericKeyboardContext = React.createContext();

const NumericKeyboardProvider = ({children}) => {
    const [data, setData] = React.useState()
    return (
        <NumericKeyboardContext.Provider
            value={{
                data,
                setData
            }}
        >
            {children}
        </NumericKeyboardContext.Provider>
    );
};

export default NumericKeyboardContext;
export {NumericKeyboardProvider};