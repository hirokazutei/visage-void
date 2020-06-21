import { State, ActionKeys, Actions } from "./types";
import { Dispatch } from "react";
import { actions } from "./actions";
import { messages } from "../strings";
import { addToDetection } from "./utils";

export function reducer(state: State, action: any) {
  state.editCount = state.editCount + 1;
  switch (action.type) {
    case actions.SET_DETECTIONS:
      return {
        ...state,
        detections: action.detections,
      };
    case actions.DELETE_DETECTION:
      if (!state.detections) {
        return state;
      }
      state.detections.splice(action.index, 1);
      return {
        ...state,
        detections: [...state.detections],
        editingIndex: undefined,
      };
    case actions.UPDATE_DETECTIONS:
      return {
        ...state,
        detections: action.fullDescription.map((description) => {
          return {
            height: Math.round(description.detection.box.height),
            width: Math.round(description.detection.box.width),
            x: Math.round(description.detection.box.x),
            y: Math.round(description.detection.box.y),
            hide: false,
          };
        }),
      };
    case actions.APPEND_DETECTIONS:
      const oldDetections = state.detections ? state.detections : [];
      return {
        ...state,
        detections: [
          ...oldDetections,
          ...action.fullDescription.map((fd) => {
            return {
              height: Math.round(fd.detection.box.height),
              width: Math.round(fd.detection.box.width),
              x: Math.round(fd.detection.box.x),
              y: Math.round(fd.detection.box.y),
              hide: false,
            };
          }),
        ],
      };
    case actions.INCREMENT_EDITING_DETECTION:
      const newIndex = (() => {
        if (!state.editingIndex || !state.detections) {
          return undefined;
        } else if (state.editingIndex + 1 >= state.detections.length) {
          return 0;
        } else {
          return state.editingIndex + 1;
        }
      })();
      return {
        ...state,
        editingIndex: newIndex,
      };
    case actions.FOCUS_DETECTION:
      return {
        ...state,
        editingIndex: action.index,
        ...(state.displayedMessages.dragToChange
          ? {}
          : {
              snackBarMessage: messages.draggable,
              displaedMessages: { dragToChange: true },
            }),
      };
    case actions.DEFOCUS_DETECTION:
      return {
        ...state,
        editingIndex: undefined,
      };
    case actions.CLOSE_SNACKBAR:
      return { ...state, snackBarMessage: "" };
    case actions.SHOW_DONATE_MODAL:
      return { ...state, modals: { showDonateModal: true } };
    case actions.HIDE_DONATE_MODAL:
      return { ...state, modals: { showDonateModal: false } };
    case actions.SHOW_INFO_MODAL:
      return { ...state, modals: { showInfoModal: true } };
    case actions.HIDE_INFO_MODAL:
      return { ...state, modals: { showInfoModal: false } };
    case actions.SHOW_CONTACT_MODAL:
      return { ...state, modals: { showContactModal: true } };
    case actions.HIDE_CONTACT_MODAL:
      return { ...state, modals: { showContactModal: false } };
    case actions.UPDATE_INPUT_SIZE:
      return { ...state, inputSize: action.inputSize };
    case actions.RESIZE:
      return {
        ...state,
        imageInfo: {
          ...state.imageInfo,
          currentRatio: action.currentRatio,
          maxRatio: action.maxRatio,
        },
      };
    case actions.SET_IMAGE_INFO:
      const { src, height, width, maxRatio } = action;
      return {
        ...state,
        detections: undefined,
        imageInfo: {
          src,
          height,
          width,
          maxRatio,
          currentRatio: maxRatio,
        },
      };
    case actions.SET_CURRENT_RATIO:
      const { currentRatio } = action;
      return { ...state, imageInfo: { ...state.imageInfo, currentRatio } };
    case actions.SET_HEIGHT_MULTIPLIER:
      const { heightMultiplier } = action;
      return { ...state, setting: { ...state.setting, heightMultiplier } };
    case actions.SET_WIDTH_MULTIPLIER:
      const { widthMultiplier } = action;
      return { ...state, setting: { ...state.setting, widthMultiplier } };
    case actions.SET_TYPE:
      const { coverType } = action;
      return { ...state, setting: { ...state.setting, type: coverType } };
    case actions.SET_COLOR:
      const { color } = action;
      return {
        ...state,
        setting: {
          ...state.setting,
          color: { ...state.setting.color, ...color },
        },
      };
    case actions.ADD_DETECTION:
      const { detections, editingIndex } = addToDetection(state);
      return { ...state, detections, editingIndex };
    case actions.CHANGE_TAB:
      const { tab } = action;
      return { ...state, currentTab: tab };

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}

export const mapReducer = (
  dispatch: Dispatch<{ type: ActionKeys } & any>
): Actions => {
  return {
    setDetections: ({ detections }) =>
      dispatch({ type: actions.SET_DETECTIONS, detections }),
    updateDetections: ({ fullDescription }) => {
      dispatch({ type: actions.UPDATE_DETECTIONS, fullDescription });
    },
    appendDetections: ({ fullDescription }) => {
      dispatch({ type: actions.APPEND_DETECTIONS, fullDescription });
    },
    deleteDetection: ({ index }) => {
      dispatch({ type: actions.DELETE_DETECTION, index });
    },
    incrementEditingDetection: () => {
      dispatch({ type: actions.INCREMENT_EDITING_DETECTION });
    },
    focusDetection: ({ index }) => {
      dispatch({ type: actions.FOCUS_DETECTION, index });
    },
    defocusDetection: () => {
      dispatch({ type: actions.DEFOCUS_DETECTION });
    },
    closeSnackBar: () => {
      dispatch({ type: actions.CLOSE_SNACKBAR });
    },
    showDonateModal: () => {
      dispatch({ type: actions.SHOW_DONATE_MODAL });
    },
    hideDonateModal: () => {
      dispatch({ type: actions.HIDE_DONATE_MODAL });
    },
    showInfoModal: () => {
      dispatch({ type: actions.SHOW_INFO_MODAL });
    },
    hideInfoModal: () => {
      dispatch({ type: actions.HIDE_INFO_MODAL });
    },
    showContactModal: () => {
      dispatch({ type: actions.SHOW_CONTACT_MODAL });
    },
    hideContactModal: () => {
      dispatch({ type: actions.HIDE_INFO_MODAL });
    },
    updateInputSize: ({ inputSize }) => {
      dispatch({ type: actions.UPDATE_INPUT_SIZE, inputSize });
    },
    resize: ({ currentRatio, maxRatio }) => {
      dispatch({ type: actions.RESIZE, currentRatio, maxRatio });
    },
    setImageInfo: ({ src, height, width, maxRatio }) => {
      dispatch({ type: actions.SET_IMAGE_INFO, src, height, width, maxRatio });
    },
    setCurrentRatio: ({ currentRatio }) => {
      dispatch({ type: actions.SET_CURRENT_RATIO, currentRatio });
    },
    setHeightMultiplier: ({ heightMultiplier }) => {
      dispatch({ type: actions.SET_HEIGHT_MULTIPLIER, heightMultiplier });
    },
    setWidthMultiplier: ({ widthMultiplier }) => {
      dispatch({ type: actions.SET_WIDTH_MULTIPLIER, widthMultiplier });
    },
    setType: ({ coverType }) => {
      dispatch({ type: actions.SET_TYPE, coverType });
    },
    setColor: ({ color }) => {
      dispatch({ type: actions.SET_COLOR, color });
    },
    addDetection: () => {
      dispatch({ type: actions.ADD_DETECTION });
    },
    changeTab: ({ tab }) => {
      dispatch({ type: actions.CHANGE_TAB, tab });
    },
  };
};
