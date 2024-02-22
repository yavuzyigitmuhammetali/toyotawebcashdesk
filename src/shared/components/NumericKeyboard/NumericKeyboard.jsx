import React, {useContext, useState} from 'react';
import "./numericKeyboard.css"
import {Button, TextField} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import NumericKeyboardContext from "./context";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function NumericKeyboard({width = "auto",dark = false,disabled = false,recurringValues =false,allowDecimal=false,fromKeyboard=false}) {
    const [value, setValue] = useState("")
    const {setData} = useContext(NumericKeyboardContext);
    const [lastValue, setLastValue] = useState(0)

    const convertToDouble = (str) => {
        const isValidNumber = /^-?\d+(\.\d+)?$/.test(str);
        if (!isValidNumber) {return 0;}
        return parseFloat(str);
    }
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
    }



    return (
        <div style={dark?{backgroundColor:"#121418",borderColor:"white",width:width}:{width:width}} className="numeric-keyboard-container">
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <TextField style={{gridColumn:"1 / span 4",gridRow:"1"}} onChange={(event)=>fromKeyboard&&setValue(event.target.value)} fullWidth value={value} size="small" id="fullWidth" />
                <Button size="small" onClick={()=>setValue("")} endIcon={<DeleteForeverIcon/>} color="error" variant="contained"></Button>
                <Button size="small"  onClick={()=>setValue(value+"00")} variant="contained">00</Button>
                <Button size="small"  onClick={()=>setValue(value.slice(0,-1))} style={{gridColumnEnd: "span 2"}} color="warning" startIcon={<BackspaceIcon/>} variant="contained"></Button>
                <Button size="small"  onClick={()=>setValue(value+"1")} variant="contained">1</Button>
                <Button size="small"  onClick={()=>setValue(value+"2")} variant="contained">2</Button>
                <Button size="small"  onClick={()=>setValue(value+"3")} variant="contained">3</Button>
                <Button size="small"  onClick={()=>setValue(value+"4")} variant="contained">4</Button>
                <Button size="small"  onClick={()=>setValue(value+"5")} variant="contained">5</Button>
                <Button size="small"  onClick={()=>setValue(value+"6")} variant="contained">6</Button>
                <Button size="small"  onClick={()=>setValue(value+"7")} variant="contained">7</Button>
                <Button size="small"  onClick={()=>setValue(value+"8")} variant="contained">8</Button>
                <Button size="small"  onClick={()=>setValue(value+"9")} variant="contained">9</Button>
                <Button size="small"  onClick={()=>setValue(value+"0")} style={{gridColumnEnd: "span 2"}} variant="contained">0</Button>
                <Button size="small"  disabled={disabled}
                    onClick={submitData}
                    style={{gridColumn:"4",gridRow:"3 / span 3"}} endIcon={<DoneOutlineIcon/>} color="success" variant="contained"></Button>
                <Button size="small"  disabled={!allowDecimal} onClick={()=>setValue(value+".")} style={{gridColumnEnd: "span 2"}} variant="contained">.</Button>

            </ThemeProvider>

        </div>
    );
}

export default NumericKeyboard;