import React, { CSSProperties } from "react";
import { Paper as MUIPaper } from "@material-ui/core";
import { COLOR } from "../../symbol/color";

const styles: { paper: CSSProperties } = {
  paper: {
    backgroundColor: COLOR.cards,
    padding: 24,
    borderRadius: 8,
    margin: 24,
  },
};

const Paper = ({ children }) => {
  return (
    <MUIPaper elevation={10} style={styles.paper}>
      {children}
    </MUIPaper>
  );
};

export { Paper };
