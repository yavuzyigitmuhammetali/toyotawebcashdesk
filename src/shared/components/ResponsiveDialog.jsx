import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTheme} from '@mui/material/styles';

export default function ResponsiveDialog({
                                             children,
                                             style,
                                             className="",
                                             disabled = false,
                                             title = "",
                                             text = "",
                                             onConfirm = () => {
                                             },
                                             manualOpen = 0,
                                             language = "en"
                                         }) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (manualOpen) {
            setOpen(true);
        }
    }, [manualOpen]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getTextByLanguage = () => {
        switch (language) {
            case "en":
                return {reject: "Reject", confirm: "Confirm"};
            case "tr":
                return {reject: "Reddet", confirm: "Onayla"};
            default:
                return {reject: "Reject", confirm: "Confirm"};
        }
    };

    const {reject, confirm} = getTextByLanguage();

    return (
        <React.Fragment>
            <div style={style} className={className} onClick={disabled ? () => {
            } : handleClickOpen}>
                {children}
            </div>
            {!disabled && (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            {reject}
                        </Button>
                        <Button onClick={() => {
                            setOpen(false);
                            onConfirm();
                        }} autoFocus>
                            {confirm}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </React.Fragment>
    );
}
