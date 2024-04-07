import {createTheme} from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
    palette: {
        mode: mode,
        ...(mode === 'light'
                ? {
                    primary: {main: '#1976d2'},
                    background: {default: '#e3f2fd', paper: '#fff'},
                    text: {primary: '#0d47a1', secondary: '#757575'},
                }
                : {
                    background: {default: '#121212', paper: '#333'},
                    primary: {main: '#90caf9'},
                    secondary: {main: '#f48fb1'},
                }
        ),
    },
    typography: {
        fontFamily: 'Rubik, sans-serif',
        h5: {fontWeight: 700},
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: mode === 'light' ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(255, 255, 255, 0.12)',
                },
            },
        },
    },
});
