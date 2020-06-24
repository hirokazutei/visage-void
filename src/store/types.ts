import { Setting, ImageInfo, Detections, FullDescription, CoverType, ColorSetting } from "../types";

export type State = {
  setting: Setting;
  imageInfo: ImageInfo;
  detections?: Detections;
  currentTab: number;
  editingIndex?: number;
  snackBarMessage: string;
  displayedMessages: {
    dragToChange: boolean;
  };
  editCount: number;
  inputSize: number;
  modals: {
    showContactModal?: boolean;
    showDonateModal?: boolean;
    showInfoModal?: boolean;
  };
};

export type Actions = {
  setDetections: ({ detections }: { detections: Detections }) => void;
  updateDetections: ({ fullDescription }: { fullDescription: FullDescription }) => void;
  appendDetections: ({ fullDescription }: { fullDescription: FullDescription }) => void;
  deleteDetection: ({ index }: { index: number }) => void;
  incrementEditingDetection: () => void;
  focusDetection: ({ index }: { index: number }) => void;
  defocusDetection: () => void;
  closeSnackBar: () => void;
  showDonateModal: () => void;
  hideDonateModal: () => void;
  showInfoModal: () => void;
  hideInfoModal: () => void;
  showContactModal: () => void;
  hideContactModal: () => void;
  updateInputSize: ({ inputSize }: { inputSize: number }) => void;
  resize: ({ currentRatio, maxRatio }: { currentRatio: number; maxRatio: number }) => void;
  setImageInfo: ({
    src,
    height,
    width,
    maxRatio,
  }: {
    src: string;
    height: number;
    width: number;
    maxRatio: number;
  }) => void;
  setCurrentRatio: ({ currentRatio }: { currentRatio: number }) => void;
  setHeightMultiplier: ({ heightMultiplier }: { heightMultiplier: number }) => void;
  setWidthMultiplier: ({ widthMultiplier }: { widthMultiplier: number }) => void;
  setType: ({ coverType }: { coverType: CoverType }) => void;
  setColor: ({ color }: { color: ColorSetting }) => void;
  addDetection: () => void;
  changeTab: ({ tab }: { tab: number }) => void;
  setGlobalEmoji: ({ globalEmoji }: { globalEmoji: string }) => void;
  setEmojiSizeMultiplier: ({ emojiSizeMultiplier }: { emojiSizeMultiplier: number }) => void;
  refreshCanvas: () => void;
};

export type ActionKeys =
  | "SET_DETECTIONS"
  | "DELETE_DETECTION"
  | "UPDATE_DETECTIONS"
  | "APPEND_DETECTIONS"
  | "INCREMENT_EDITING_DETECTION"
  | "FOCUS_DETECTION"
  | "DEFOCUS_DETECTION"
  | "CLOSE_SNACKBAR"
  | "SHOW_DONATE_MODAL"
  | "HIDE_DONATE_MODAL"
  | "SHOW_INFO_MODAL"
  | "HIDE_INFO_MODAL"
  | "SHOW_CONTACT_MODAL"
  | "HIDE_CONTACT_MODAL"
  | "UPDATE_INPUT_SIZE"
  | "RESIZE"
  | "SET_IMAGE_INFO"
  | "SET_CURRENT_RATIO"
  | "SET_HEIGHT_MULTIPLIER"
  | "SET_WIDTH_MULTIPLIER"
  | "SET_TYPE"
  | "SET_COLOR"
  | "ADD_DETECTION"
  | "CHANGE_TAB"
  | "SET_GLOBAL_EMOJI"
  | "SET_EMOJI_SIZE_MULTIPLIER"
  | "REFRESH_CANVAS";

export type ContextType = { state: State; actions: Actions };
