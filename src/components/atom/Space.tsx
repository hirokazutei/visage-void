import React, { CSSProperties } from "react";
import { SizeKey } from "../../types";
import symbol from "../../symbol";

type StackPops = { size: SizeKey };
type QueueProps = { size: SizeKey };

type All = {
  all: SizeKey;
  horizontal?: never;
  vertical?: never;
  top?: never;
  right?: never;
  bottom?: never;
  left?: never;
};

type VerHor = {
  all?: never;
  horizontal: SizeKey;
  vertical: SizeKey;
  top?: never;
  right?: never;
  bottom?: never;
  left?: never;
};

type Horizontal = {
  all?: never;
  horizontal: SizeKey;
  vertical?: never;
  top?: SizeKey;
  right?: never;
  bottom?: SizeKey;
  left?: never;
};

type Vertical = {
  all?: never;
  horizontal?: never;
  vertical: SizeKey;
  top?: never;
  right?: SizeKey;
  bottom?: never;
  left?: SizeKey;
};

type Other = {
  all?: never;
  horizontal?: never;
  vertical?: never;
  top?: SizeKey;
  right?: SizeKey;
  bottom?: SizeKey;
  left?: SizeKey;
};
type PaddingProps = All | VerHor | Horizontal | Vertical | Other;
type InsetProps = PaddingProps & {
  style?: CSSProperties;
  children: React.ReactNode;
};

const convertPaddingToStyle = (padding: PaddingProps): CSSProperties => {
  // All
  if ((padding as All).all) {
    return { padding: symbol.SPACE[(padding as All).all] };

    // Vertical & Horizontal
  } else if ((padding as VerHor).vertical && (padding as VerHor).horizontal) {
    return {
      paddingTop: symbol.SPACE[(padding as VerHor).vertical],
      paddingBottom: symbol.SPACE[(padding as VerHor).vertical],
      paddingLeft: symbol.SPACE[(padding as VerHor).horizontal],
      paddingRight: symbol.SPACE[(padding as VerHor).horizontal],
    };

    // Vertical & Right & Left
  } else if ((padding as Vertical).vertical) {
    const rightKey = (padding as Vertical).right;
    const leftKey = (padding as Vertical).left;
    return {
      paddingTop: symbol.SPACE[(padding as Vertical).vertical],
      paddingBottom: symbol.SPACE[(padding as Vertical).vertical],
      paddingRight: rightKey && symbol.SPACE[rightKey],
      paddingLeft: leftKey && symbol.SPACE[leftKey],
    };

    // Horizontal & Top & Bottom
  } else if ((padding as Horizontal).horizontal) {
    const topKey = (padding as Horizontal).top;
    const bottomKey = (padding as Horizontal).bottom;
    return {
      paddingLeft: symbol.SPACE[(padding as Horizontal).horizontal],
      paddingRight: symbol.SPACE[(padding as Horizontal).horizontal],
      paddingTop: topKey && symbol.SPACE[topKey],
      paddingBottom: bottomKey && symbol.SPACE[bottomKey],
    };

    // Top & Right & Bottom & Left
  } else {
    const topKey = (padding as Other).top;
    const rightKey = (padding as Other).right;
    const bottomKey = (padding as Other).bottom;
    const leftKey = (padding as Other).left;
    return {
      paddingTop: topKey && symbol.SPACE[topKey],
      paddingRight: rightKey && symbol.SPACE[rightKey],
      paddingBottom: bottomKey && symbol.SPACE[bottomKey],
      paddingLeft: leftKey && symbol.SPACE[leftKey],
    };
  }
};

const Stack = ({ size }: StackPops) => {
  return <div style={{ height: symbol.SPACE[size] }} />;
};

const Queue = ({ size }: QueueProps) => {
  return <div style={{ width: symbol.SPACE[size] }} />;
};

const Inset = ({ style, children, ...size }: InsetProps) => {
  const divStyle = {
    ...convertPaddingToStyle(size),
    ...style,
  };
  return <div style={divStyle}>{children}</div>;
};

export default { Stack, Queue, Inset };
