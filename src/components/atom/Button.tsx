import React, { CSSProperties } from "react";
import { Button as MUIButton } from "@material-ui/core";
import { ButtonText, Label } from "./Text";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (args: any) => void;
  style?: CSSProperties;
};

const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    <MUIButton onClick={onClick} style={style}>
      <ButtonText>{children}</ButtonText>
    </MUIButton>
  );
};

const ContainedButton = ({ children, onClick, style }: ButtonProps) => {
  return (
    <MUIButton onClick={onClick} variant="contained" color={"primary"}>
      <Label>{children}</Label>
    </MUIButton>
  );
};

export { Button, ContainedButton };
