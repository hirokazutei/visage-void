import React, { CSSProperties } from "react";
import { Typography } from "@material-ui/core";
import symbol from "../../symbol";

type StyleKey =
  | "body"
  | "label"
  | "buttonText"
  | "caption"
  | "subTitle"
  | "title";

const styles: Record<StyleKey, CSSProperties> = {
  body: {
    color: symbol.COLOR.text,
    fontSize: 14,
  },
  label: {
    color: symbol.COLOR.text,
    fontSize: 16,
  },
  buttonText: {
    color: symbol.COLOR.buttonText,
    fontSize: 18,
    fontWeight: "bold",
  },
  caption: {
    color: symbol.COLOR.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    color: symbol.COLOR.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: symbol.COLOR.text,
    fontSize: 34,
  },
};

type Props = {
  children: React.ReactNode;
  customStyle?: CSSProperties;
};

const Body = ({ children, customStyle = {} }: Props) => {
  return (
    <Typography variant="body1" style={{ ...styles.body, ...customStyle }}>
      {children}
    </Typography>
  );
};

const Label = ({ children, customStyle = {} }: Props) => {
  return (
    <Typography variant="body1" style={{ ...styles.label, ...customStyle }}>
      {children}
    </Typography>
  );
};

const ButtonText = ({ children, customStyle = {} }: Props) => {
  return (
    <Typography
      variant="button"
      style={{ ...styles.buttonText, ...customStyle }}
    >
      {children}
    </Typography>
  );
};

const Caption = ({ children, customStyle = {} }: Props) => {
  return (
    <Typography variant="caption" style={{ ...styles.caption, ...customStyle }}>
      {children}
    </Typography>
  );
};

const SubTitle = ({ children, customStyle = {} }: Props) => {
  return (
    <Typography variant="h2" style={{ ...styles.caption, ...customStyle }}>
      {children}
    </Typography>
  );
};

const Title = ({ children, customStyle = {} }: Props) => {
  return (
    <Typography variant="h1" style={{ ...styles.title, ...customStyle }}>
      {children}
    </Typography>
  );
};

export { Body, Label, ButtonText, Caption, SubTitle, Title };
