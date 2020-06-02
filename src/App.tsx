import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import Page from "./components/Page";
import Context, { INITIAL_VALUE } from "./context";
import { ContextValue } from "./types";
import { theme } from "./theme";

const App = () => {
  const [context, setContext] = useState<ContextValue>(INITIAL_VALUE);
  return (
    <Context.Provider value={{ context, setContext }}>
      <ThemeProvider theme={theme}>
        <Page />
      </ThemeProvider>
    </Context.Provider>
  );
};

export default App;
