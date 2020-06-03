import React from "react";
import { Button as MUIButton } from "@material-ui/core";
import { ButtonText } from "./Text";

const Button = ({ children, onClick }) => {
  return (
    <MUIButton onClick={onClick}>
      <ButtonText>{children}</ButtonText>
    </MUIButton>
  );
};

export { Button };
