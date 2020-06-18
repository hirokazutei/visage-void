import React, { CSSProperties } from "react";
import { Button as MUIButton } from "@material-ui/core";
import { ButtonText, Label } from "./Text";

type ButtonProps = {
  children: React.ReactNode;
  onClick: (args: any) => void;
  customStyle?: CSSProperties;
  customTextStyle?: CSSProperties;
};

const Button = ({
  children,
  onClick,
  customStyle,
  customTextStyle,
}: ButtonProps) => {
  return (
    <MUIButton onClick={onClick} style={customStyle}>
      <ButtonText customStyle={customTextStyle}>{children}</ButtonText>
    </MUIButton>
  );
};

const ContainedButton = ({
  children,
  onClick,
  customStyle,
  customTextStyle,
}: ButtonProps) => {
  return (
    <MUIButton
      onClick={onClick}
      variant="contained"
      color={"primary"}
      style={customStyle}
    >
      <Label customStyle={customTextStyle}>{children}</Label>
    </MUIButton>
  );
};

export { Button, ContainedButton };
