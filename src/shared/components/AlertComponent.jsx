import React, { useState } from 'react';
import { Alert, Slide, Snackbar } from '@mui/material';

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

function AlertComponent({open:_open=false,message="",style,autoHideDuration=3000,variant="filled",severity="error"}) {
    const [open, setOpen] = useState(_open);

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
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
