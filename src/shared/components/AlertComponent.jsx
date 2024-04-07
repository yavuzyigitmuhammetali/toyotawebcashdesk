import React, {useEffect, useState} from 'react';
import {Alert, Slide, Snackbar} from '@mui/material';
import {useLocation, useNavigate} from "react-router-dom";

function SlideTransition(props) {
    return <Slide {...props} direction="down"/>;
}

function AlertComponent({style, autoHideDuration = 3000, variant = "filled"}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState('info');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const state = location.state;
        if (state) {
            if (state.errorMessage) {
                setMessage(state.errorMessage);
                setSeverity('error');
            } else if (state.successMessage) {
                setMessage(state.successMessage);
                setSeverity('success');
            } else if (state.infoMessage) {
                setMessage(state.infoMessage);
                setSeverity('info');
            } else if (state.warningMessage) {
                setMessage(state.warningMessage);
                setSeverity('warning');
            }
            setOpen(!!message);
            navigate(location.pathname, {replace: true, state: {}});
        }
    }, [navigate, message]);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div style={style}>
            <Snackbar
                open={open}
                onClose={() => handleClose('timeout')}
                TransitionComponent={SlideTransition}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={autoHideDuration}
            >
                <Alert onClose={() => handleClose('close')} variant={variant} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AlertComponent;
