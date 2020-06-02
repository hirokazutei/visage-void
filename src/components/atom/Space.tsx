import React from "react";
import { SizeKey } from "../../types";
import symbol from "../../symbol";

const Stack = ({ size }: { size: SizeKey }) => {
  return <div style={{ height: symbol.SPACE[size] }} />;
};

const Queue = ({ size }: { size: SizeKey }) => {
  return <div style={{ width: symbol.SPACE[size] }} />;
};

export default { Stack, Queue };
