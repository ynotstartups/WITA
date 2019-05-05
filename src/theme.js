import red from "@material-ui/core/colors/red"
import { createMuiTheme } from "@material-ui/core/styles"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d2a32d",
    },
    secondary: {
      main: "#e53935",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
})

export default theme
