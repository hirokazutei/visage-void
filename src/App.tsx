import React, { useState } from "react";
import Page from "./components/Page";
import Context, { INITIAL_VALUE } from "./context";
import { ContextValue } from "./types";

const App = () => {
  const [context, setContext] = useState<ContextValue>(INITIAL_VALUE);
  return (
    <Context.Provider value={{ context, setContext }}>
      <Page />
    </Context.Provider>
  );
};

export default App;
