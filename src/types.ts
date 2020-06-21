import {
  WithFaceDetection,
  WithFaceLandmarks,
  FaceDetection,
  FaceLandmarks68,
} from "face-api.js";

export type ColorSetting = {
  red: number;
  green: number;
  blue: number;
};

export type CoverType = "OVAL" | "BOX";

export type SizeKey = "tiny" | "small" | "medium" | "large" | "huge" | "macro";

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
  maxRatio?: number;
  currentRatio: number;
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

export type FullDescription = Array<
  WithFaceDetection<
    WithFaceLandmarks<
      {
        detection: FaceDetection;
      },
      FaceLandmarks68
    >
  >
>;
