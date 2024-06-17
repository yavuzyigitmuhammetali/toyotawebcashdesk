import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';
import "./numericKeyboard.css";
import {Button, TextField} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NumericKeyboardContext from "./context";


function NumericKeyboard({
                             width = "auto",
                             dark = false,
                             disabled = false,
                             recurringValues = false,
                             allowDecimal = false,
                             fromKeyboard = false,
                             performanceMode = false,
                             buttonColor = "primary"
                         }) {
    const [value, setValue] = useState("");
    const {setData} = useContext(NumericKeyboardContext);
    const [lastValue, setLastValue] = useState(0);

    const convertToDouble = (str) => {
        const isValidNumber = /^-?\d+(\.\d+)?$/.test(str);
        if (!isValidNumber) {
            return 0;
        }
        return parseFloat(str);
    };

    const submitData = () => {
        const number = convertToDouble(value);
        if (recurringValues) {
            if (!number) {
                return setValue("");
            }
            setData(number === lastValue ? number + 0.0001 : number);
            setLastValue(number === lastValue ? number + 0.0001 : number);
        } else {
            setData(number || 0);
        }
        setValue("");
    };

    return (
        <div className={`numeric-keyboard-container ${dark ? 'dark' : ''} ${performanceMode ? 'performance' : ''}`}
             style={{width: width}}>
            <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
                <TextField
                    className="numeric-keyboard-textfield"
                    onChange={(event) => fromKeyboard && setValue(event.target.value)}
                    fullWidth
                    value={value}
                    size="small"
                    id="fullWidth"
                />
                <Button
                    size="small"
                    onClick={() => setValue("")}
                    endIcon={<DeleteForeverIcon/>}
                    color="error"
                    variant="contained"
                    disableElevation={performanceMode}
                ></Button>
                <Button
                    size="small"
                    onClick={() => setValue(value + "00")}
                    variant="contained"
                    disableElevation={performanceMode}
                >
                    00
                </Button>
                <Button
                    size="small"
                    onClick={() => setValue(value.slice(0, -1))}
                    className="numeric-keyboard-backspace"
                    color="warning"
                    startIcon={<BackspaceIcon/>}
                    variant="contained"
                    disableElevation={performanceMode}
                ></Button>
                {[...Array(10).keys()].map(num => (
                    <Button
                        key={num}
                        size="small"
                        onClick={() => setValue(value + num)}
                        variant="contained"
                        disableElevation={performanceMode}
                        color={buttonColor}
                    >
                        {num}
                    </Button>
                ))}
                <Button
                    size="small"
                    disabled={disabled}
                    onClick={submitData}
                    className="numeric-keyboard-submit"
                    endIcon={<DoneOutlineIcon/>}
                    color="success"
                    variant="contained"
                    disableElevation={performanceMode}
                ></Button>
                <Button
                    size="small"
                    disabled={!allowDecimal}
                    onClick={() => setValue(value + ".")}
                    className="numeric-keyboard-decimal"
                    variant="contained"
                    disableElevation={performanceMode}
                >
                    .
                </Button>
            </ThemeProvider>
        </div>
    );
}

NumericKeyboard.propTypes = {
    width: PropTypes.string,
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    recurringValues: PropTypes.bool,
    allowDecimal: PropTypes.bool,
    fromKeyboard: PropTypes.bool,
    performanceMode: PropTypes.bool,
    buttonColor: PropTypes.oneOf([
        "inherit",
        "primary",
        "secondary",
        "success",
        "error",
        "info",
        "warning"
    ])
};

export default NumericKeyboard;
