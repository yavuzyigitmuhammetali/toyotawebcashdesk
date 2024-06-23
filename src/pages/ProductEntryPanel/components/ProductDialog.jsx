import React from 'react';
import {Button, CircularProgress} from "@mui/material";
import ResponsiveDialog from "../../../shared/components/ResponsiveDialog";

function ProductDialog({valid, isLoading, handleSendData, enterRef, lang, t, performanceMode}) {
    return (
        <ResponsiveDialog className={`save-button ${performanceMode ? 'performance' : ''}`} language={lang}
                          disabled={!valid || isLoading}
                          onConfirm={handleSendData}
                          title={t('saveProduct')} text={t('saveProductConfirmation')}>
            <Button className={`save-button ${performanceMode ? 'performance' : ''}`} disabled={!valid || isLoading}
                    color={valid ? "success" : "error"}
                    ref={enterRef}
                    variant="outlined">
                {isLoading ? <CircularProgress size={32}/> : t('saveProduct')}
            </Button>
        </ResponsiveDialog>
    );
}

export default React.memo(ProductDialog);
