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

export type Detections = Array<any>;

export type ContextValue = {
  setting: Setting;
  imageInfo: ImageInfo;
  detections?: Detections;
  showDialog: boolean;
};

export type ContextType = {
  context: ContextValue;
  setContext: (context: ContextValue) => void;
};
