import React from "react";
import { ContextType, ContextValue } from "./types";
import { COVER_TYPE } from "./const";

export const INITIAL_VALUE: ContextValue = {
  setting: {
    heightMultiplier: 80,
    widthMultiplier: 80,
    type: COVER_TYPE[0],
    color: {
      red: 0,
      blue: 0,
      green: 0,
    },
  },
  imageInfo: {},
};

export const INITIAL_STATE: ContextType = {
  context: INITIAL_VALUE,
  setContext: () => {},
};

const SettingContext = React.createContext<ContextType>(INITIAL_STATE);

export default SettingContext;
