import React, {useCallback, useContext, useState} from "react";
import PropTypes from "prop-types";
import styles from "./NumericKeyboard.module.css";
import {Button, TextField} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NumericKeyboardContext from "./context";

const NumericKeyboard = ({
                             width = "auto",
                             dark = false,
                             disabled = false,
                             recurringValues = false,
                             allowDecimal = false,
                             fromKeyboard = false,
                             performanceMode = false,
                             buttonColor = "primary",
                         }) => {
    const [value, setValue] = useState("");
    const {setData} = useContext(NumericKeyboardContext);
    const [lastValue, setLastValue] = useState(0);

    const convertToDouble = useCallback((str) => {
        const isValidNumber = /^-?\d+(\.\d+)?$/.test(str);
        return isValidNumber ? parseFloat(str) : 0;
    }, []);

    const submitData = useCallback(() => {
        const number = convertToDouble(value);
        if (recurringValues) {
            if (number) {
                const newValue = number === lastValue ? number + 0.0001 : number;
                setData(newValue);
                setLastValue(newValue);
            }
        } else {
            setData(number || 0);
        }
        setValue("");
    }, [convertToDouble, value, recurringValues, lastValue, setData]);

    const handleKeyPress = useCallback(
        (key) => {
            if (key === "backspace") {
                setValue((prevValue) => prevValue.slice(0, -1));
            } else if (key === "clear") {
                setValue("");
            } else if (key === "submit") {
                submitData();
            } else if (key === "decimal" && allowDecimal) {
                setValue((prevValue) => prevValue + ".");
            } else if (/\d/.test(key)) {
                setValue((prevValue) => prevValue + key);
            }
        },
        [submitData, allowDecimal]
    );

    return (
        <div
            className={`${styles.numericKeyboardContainer} ${
                dark ? styles.dark : ""
            } ${performanceMode ? styles.performance : ""}`}
            style={{width}}
        >
            <ThemeProvider
                theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}
            >
                <TextField
                    color={buttonColor}
                    className={styles.numericKeyboardTextfield}
                    onChange={(event) => fromKeyboard && setValue(event.target.value)}
                    fullWidth
                    value={value}
                    size="small"
                    id="fullWidth"
                />
                <Button
                    size="small"
                    onClick={() => handleKeyPress("clear")}
                    endIcon={<DeleteForeverIcon/>}
                    color="error"
                    variant="contained"
                    disableElevation={performanceMode}
                />
                <Button
                    size="small"
                    color={buttonColor}
                    onClick={() => handleKeyPress("00")}
                    variant="contained"
                    disableElevation={performanceMode}
                >
                    00
                </Button>
                <Button
                    size="small"
                    onClick={() => handleKeyPress("backspace")}
                    className={styles.numericKeyboardBackspace}
                    color="warning"
                    startIcon={<BackspaceIcon/>}
                    variant="contained"
                    disableElevation={performanceMode}
                />
                {[...Array(9).keys()].map((num) => (
                    <Button
                        key={num + 1}
                        size="small"
                        onClick={() => handleKeyPress((num + 1).toString())}
                        variant="contained"
                        disableElevation={performanceMode}
                        color={buttonColor}
                    >
                        {num + 1}
                    </Button>
                ))}
                <Button
                    size="small"
                    disabled={disabled}
                    onClick={() => handleKeyPress("submit")}
                    className={styles.numericKeyboardSubmit}
                    endIcon={<DoneOutlineIcon/>}
                    color="success"
                    variant="contained"
                    disableElevation={performanceMode}
                />
                <Button
                    size="small"
                    onClick={() => handleKeyPress("0")}
                    variant="contained"
                    disableElevation={performanceMode}
                    color={buttonColor}
                    className={styles.numericKeyboardDecimal}
                >
                    0
                </Button>
                <Button
                    size="small"
                    disabled={!allowDecimal}
                    onClick={() => handleKeyPress("decimal")}
                    className={styles.numericKeyboardDecimal}
                    variant="contained"
                    disableElevation={performanceMode}
                >
                    .
                </Button>
            </ThemeProvider>
        </div>
    );
};

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
        "warning",
    ]),
};

export default NumericKeyboard;