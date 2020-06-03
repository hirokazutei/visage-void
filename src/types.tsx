export type CoverType = "OVAL" | "BOX";

export type SizeKey = "tiny" | "small" | "medium" | "large" | "huge" | "macro";

export type ColorSetting = {
  red: number;
  green: number;
  blue: number;
};

export type Setting = {
  heightMultiplier: number;
  widthMultiplier: number;
  type: CoverType;
  color: ColorSetting;
};

export type ImageInfo = {
  src?: string;
  width?: number;
  height?: number;
};

export type PositionSize = {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
};

export type Detection = {
  hide: boolean;
  color?: ColorSetting;
} & Required<PositionSize>;

export type Detections = Array<Detection>;

export type ContextValue = {
  setting: Setting;
  imageInfo: ImageInfo;
  detections?: Detections;
  showDialog: boolean;
  currentTab: number;
  editingIndex?: number;
  snackBarMessage: string;
  displaedMessages: {
    dragToChange: boolean;
  };
};

export type ContextType = {
  context: ContextValue;
  setContext: (context: ContextValue) => void;
};
