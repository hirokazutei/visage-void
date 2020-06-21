import React, { useReducer } from "react";
import { ThemeProvider } from "@material-ui/core";
import Page from "./components/Page";
import { theme } from "./theme";
import { mapReducer, reducer } from "./store/reducer";
import { Context, INITIAL_STATE } from "./store";

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const actions = mapReducer(dispatch);

  return (
    <Context.Provider value={{ state, actions }}>
      <ThemeProvider theme={theme}>
        <Page />
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
