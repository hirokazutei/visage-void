import { createContext, useContext } from "react";
import { State, ContextType } from "./types";
import { COVER_TYPE } from "../const";
import { mapReducer } from "./reducer";

export const INITIAL_STATE: State = {
  setting: {
    heightMultiplier: 100,
    widthMultiplier: 100,
    emojiSizeMultiplier: 100,
    type: COVER_TYPE[0],
    color: {
      red: 0,
      blue: 0,
      green: 0,
    },
    globalEmoji: "😃",
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

const INITIAL_CONTEXT: ContextType = {
  state: INITIAL_STATE,
  actions: mapReducer(() => {}),
};

export const Context = createContext<ContextType>(INITIAL_CONTEXT);

export const useStore = () => {
  return useContext(Context);
};
