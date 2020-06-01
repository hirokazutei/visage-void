import React from "react";
import { SizeKey } from "../../types";
import { SIZE } from "../../const";

const Stack = ({ size }: { size: SizeKey }) => {
  return <div style={{ height: SIZE[size] }} />;
};

const Queue = ({ size }: { size: SizeKey }) => {
  return <div style={{ width: SIZE[size] }} />;
};

export default { Stack, Queue };
