import React, { CSSProperties } from "react";
import { Paper as MUIPaper } from "@material-ui/core";
import { COLOR } from "../../symbol/color";
import symbol from "../../symbol";

const styles: { paper: CSSProperties; pageMarker: CSSProperties } = {
  paper: {
    backgroundColor: COLOR.cards,
    padding: symbol.SPACE.huge,
    borderRadius: 8,
  },
  pageMarker: {
    backgroundColor: COLOR.pageMarker,
    paddingTop: symbol.SPACE.tiny,
    paddingBottom: symbol.SPACE.tiny,
    paddingLeft: symbol.SPACE.medium,
    paddingRight: symbol.SPACE.medium,
  },
};

type Props = {
  children: React.ReactNode;
  customStyle?: CSSProperties;
};

const Paper = ({ children, customStyle = {} }: Props) => {
  return (
    <MUIPaper elevation={12} style={{ ...styles.paper, ...customStyle }}>
      {children}
    </MUIPaper>
  );
};

const PageMarker = ({ children, customStyle = {} }: Props) => {
  return (
    <MUIPaper elevation={2} style={{ ...styles.pageMarker, ...customStyle }}>
      {children}
    </MUIPaper>
  );
};

export { Paper, PageMarker };
