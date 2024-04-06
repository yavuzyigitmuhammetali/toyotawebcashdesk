import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {createTheme, ThemeProvider} from "@mui/material/styles";


function FormDialog({
    children,
    onClose = () => {},
    openManual = 0,
    screenKeyboard = true,
    buttonName,
    dialog,
    func = () => {},
    disabled = false,
    dark = false,
    onOff = false,
    label,
    errorText,
    style,
    keyboardContext = null,
    ScreenKeyboardComponent = null,
    language = "en"
}) {
    const [inputValue, setInputValue] = useState("")
    const { handleElementFocus, value, onChangeValue, enterRef, clearValues } = keyboardContext || {};
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        setInputValue(value?.formDialog??"");
        setError(false);
    }, [value]);

    useEffect(() => {
        if (openManual>0){
            setOpen(true)
        }
    }, [openManual]);

    const getTextByLanguage = () => {
        switch (language) {
            case "en":
                return { cancel: "Cancel", apply: "Apply" };
            case "tr":
                return { cancel: "İptal", apply: "Uygula" };
            default:
                return { cancel: "Cancel", apply: "Apply" };
        }
    };

    const { cancel, apply } = getTextByLanguage();

    const handleClickOpen = () => {
        setOpen(true);
        clearValues?.();
    };

    const handleClose = (page = true) => {
        page && onClose();
        setOpen(false);
        clearValues?.();
    };

    return (
        <ThemeProvider theme={createTheme({ palette: { mode: dark ? "dark" : "light" } })}>
            <React.Fragment>
                {children ?
                    <div style={style} color={onOff ? "success" : "error"} onClick={handleClickOpen}>
                        {children}
                    </div>
                    :
                    <div>
                        <Button style={style} color={onOff ? "success" : "error"} disabled={disabled} variant="contained" onClick={handleClickOpen}>
                            {buttonName}
                        </Button>
                    </div>
                }
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
                            func(email) ? handleClose(false) : setError(true);
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
                            helperText={error ? errorText : ""}
                            onFocus={handleElementFocus}
                            onChange={onChangeValue}
                            value={inputValue}
                            focused
                            autoFocus
                            required
                            margin="dense"
                            id="formDialog"
                            name="email"
                            label={label}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        {screenKeyboard && ScreenKeyboardComponent ? <ScreenKeyboardComponent dark={dark} /> : null}
                        <Button onClick={handleClose}>{cancel}</Button>
                        <Button ref={enterRef} type="submit">{apply}</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
    );
}

export default FormDialog;
