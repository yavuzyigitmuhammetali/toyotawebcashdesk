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


function NumericKeyboard({width = "auto",dark = false,disabled = false}) {
    const [value, setValue] = useState("")
    const {setData} = useContext(NumericKeyboardContext);

    const convertToDouble = (str) => {
        const isValidNumber = /^-?\d+(\.\d+)?$/.test(str);
        if (!isValidNumber) {return 0;}
        return parseFloat(str);
    }

    const submitData = ()=>{
        const number = convertToDouble(value);
        setData(number);
        return setValue("");
    }


    return (
        <div style={dark?{backgroundColor:"#121418",borderColor:"white",width:width}:{width:width}} className="numeric-keyboard-container">
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <TextField style={{gridColumn:"1 / span 4",gridRow:"1"}} fullWidth value={value} size="small" id="fullWidth" />
                <Button onClick={()=>setValue("")} endIcon={<DeleteForeverIcon/>} color="error" variant="contained"></Button>
                <Button onClick={()=>setValue(value+"00")} variant="contained">00</Button>
                <Button onClick={()=>setValue(value.slice(0,-1))} style={{gridColumnEnd: "span 2"}} color="warning" startIcon={<BackspaceIcon/>} variant="contained"></Button>
                <Button onClick={()=>setValue(value+"1")} variant="contained">1</Button>
                <Button onClick={()=>setValue(value+"2")} variant="contained">2</Button>
                <Button onClick={()=>setValue(value+"3")} variant="contained">3</Button>
                <Button onClick={()=>setValue(value+"4")} variant="contained">4</Button>
                <Button onClick={()=>setValue(value+"5")} variant="contained">5</Button>
                <Button onClick={()=>setValue(value+"6")} variant="contained">6</Button>
                <Button onClick={()=>setValue(value+"7")} variant="contained">7</Button>
                <Button onClick={()=>setValue(value+"8")} variant="contained">8</Button>
                <Button onClick={()=>setValue(value+"9")} variant="contained">9</Button>
                <Button onClick={()=>setValue(value+"0")} style={{gridColumnEnd: "span 2"}} variant="contained">0</Button>
                <Button disabled={disabled}
                    onClick={submitData}
                    style={{gridColumn:"4",gridRow:"3 / span 3"}} endIcon={<DoneOutlineIcon/>} color="success" variant="contained"></Button>
                <Button disabled onClick={()=>setValue(value+".")} style={{gridColumnEnd: "span 2"}} variant="contained">.</Button>

            </ThemeProvider>

        </div>
    );
}

export default NumericKeyboard;