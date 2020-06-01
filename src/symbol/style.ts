import { CSSProperties } from "react";
import { COLOR } from "./color";

const STYLE: {
  button: CSSProperties;
  contentWrapper: CSSProperties;
} = {
  button: {
    backgroundColor: COLOR.button,
    borderRadius: 8,
    margin: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    backgroundColor: COLOR.expansion,
  },
};

export { STYLE };
