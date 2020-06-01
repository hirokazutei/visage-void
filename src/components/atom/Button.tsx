import React from "react";
import { Button as MUIBUtton } from "@material-ui/core";
import { ButtonText } from "./Text";

const Button = ({ children, onClick }) => {
  return (
    <MUIBUtton onClick={onClick}>
      <ButtonText>{children}</ButtonText>
    </MUIBUtton>
  );
};

export { Button };
