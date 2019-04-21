import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d2a32d',
    },
    secondary: {
      main: '#e53935',
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
