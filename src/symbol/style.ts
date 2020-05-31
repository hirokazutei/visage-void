import { CSSProperties } from "react";
import { COLOR } from "./color";

const STYLE: {
  card: CSSProperties;
  text: CSSProperties;
  button: CSSProperties;
  buttonText: CSSProperties;
} = {
  card: {
    backgroundColor: COLOR.cards,
    padding: 24,
    borderRadius: 8,
    boxShadow: `0px 0px 15px ${COLOR.backgroundOffset}`,
  },
  text: {
    color: COLOR.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: COLOR.button,
    borderRadius: 8,
    margin: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: COLOR.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
};

export { STYLE };
