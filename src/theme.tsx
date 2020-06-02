import { createMuiTheme } from "@material-ui/core/styles";
import symbol from "./symbol";

const secondaryText = {
  main: symbol.COLOR.text,
};

export const theme = createMuiTheme({
  palette: {
    secondary: secondaryText,
  },
});
