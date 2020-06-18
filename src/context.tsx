import React from "react";
import { ContextType, ContextValue } from "./types";
import { COVER_TYPE } from "./const";

export const INITIAL_VALUE: ContextValue = {
  setting: {
    heightMultiplier: 100,
    widthMultiplier: 100,
    type: COVER_TYPE[0],
    color: {
      red: 0,
      blue: 0,
      green: 0,
    },
  },
  imageInfo: { currentRatio: 1 },
  currentTab: 0,
  editingIndex: undefined,
  snackBarMessage: "",
  displayedMessages: {
    dragToChange: false,
  },
  editCount: 0,
  inputSize: 1024,
  modals: {},
};

export const INITIAL_STATE: ContextType = {
  context: INITIAL_VALUE,
  setContext: () => {},
};

const SettingContext = React.createContext<ContextType>(INITIAL_STATE);

export default SettingContext;
