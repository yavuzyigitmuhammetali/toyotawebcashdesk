import React, {useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import KeyboardContext from "./ScreenKeyboard/context";
import ScreenKeyboard from "./ScreenKeyboard/ScreenKeyboard";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});



function FormDialog({screenKeyboard=true,buttonName,dialog,func=()=>{},disabled=false,dark=false,onOff=false,label,errorText,style}) {


    const { handleElementClick, value,onChangeValue,enter } = useContext(KeyboardContext);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={dark?darkTheme:lightTheme}>
            <React.Fragment>
                <Button style={style} color={onOff?"success":"error"} disabled={disabled} variant="contained" onClick={handleClickOpen}>
                    {buttonName}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            func(email)?handleClose():setError(true);

                        },
                    }}
                >
                    <DialogTitle>{buttonName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialog}
                        </DialogContentText>
                        <TextField
                            error={error}
                            helperText={error?errorText:""}
                            focused
                            onClick={handleElementClick}
                            onChange={(e)=>{onChangeValue(e.target.value);setError(false)}}
                            value={value["deneme"]?value["deneme"]:""}
                            autoFocus
                            required
                            margin="dense"
                            id="deneme"
                            name="email"
                            label={label}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        {screenKeyboard&&<ScreenKeyboard dark={dark}/>}
                        <Button onClick={handleClose}>İptal</Button>
                        <Button ref={enter} type="submit">Uygula</Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        </ThemeProvider>
    );
}

export default FormDialog;