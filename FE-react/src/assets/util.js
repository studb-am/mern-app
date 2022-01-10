import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#781C68'
        } ,
        secondary: {
            main: '#FFD39A' 
        },
        info: {
            main: '#086E7D' 
        },
        waring: {
            main: '#FFC900'
        },
        error: {
            main: '#FF1700'
        },
        success: {
            main: '#519259'
        },
        neutral: {
            main: '#FFF'
        }
    }
});

export const IS_MOBILE_VIEW_DEF = '(max-width: 600px)';