import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import KeyboardContext from "../../../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../../../shared/components/ScreenKeyboard/ScreenKeyboard";
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

function FormDialog({buttonName,dialog,func=()=>{},disabled=false,dark=false,onOff=false,style}) {
    const { handleElementClick, value,onChangeValue,enter } = React.useContext(KeyboardContext);
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
                            console.log(email);
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
                            helperText={error?"Kimlik numarası hatalı veya bir öğrenciye ait değil!":""}
                            focused
                            onClick={handleElementClick}
                            onChange={(e)=>{onChangeValue(e.target.value);setError(false)}}
                            value={value["deneme"]?value["deneme"]:""}
                            autoFocus
                            required
                            margin="dense"
                            id="deneme"
                            name="email"
                            label="Öğrenci Kimlik Numarası"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <ScreenKeyboard dark={dark}/>
                        <Button onClick={handleClose}>İptal</Button>
                        <Button ref={enter} type="submit">Uygula</Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        </ThemeProvider>
    );
}

export default FormDialog;