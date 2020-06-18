import React from "react";
import { ColorKeys } from "../../symbol/color";
import symbol from "../../symbol";

type Props = {
  thickness?: number;
  color?: ColorKeys;
};

const Horizontal = ({ thickness = 1, color = "text" }: Props) => {
  return (
    <div
      style={{
        height: thickness,
        backgroundColor: symbol.COLOR[color],
      }}
    />
  );
};

const Vertical = ({ thickness = 1, color = "text" }: Props) => {
  return (
    <div
      style={{
        width: thickness,
        backgroundColor: symbol.COLOR[color],
      }}
    />
  );
};

export default { Horizontal, Vertical };
