import { Detections, Detection } from "../../../types";

export const clamp: (num: number, min: number, max: number) => number = (num: number, min: number, max: number) =>
  num < min ? min : num > max ? max : num;

export const between = (num: number, min: number, max: number): boolean => num >= min && num < max;

export const withinArea = ({
  xStart,
  xEnd,
  yStart,
  yEnd,
  x,
  y,
}: {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  x: number;
  y: number;
}): boolean => {
  return between(x, xStart, xEnd) && between(y, yStart, yEnd);
};

export const adjustDetections = (detections: Detections, currentRatio: number): Detections => {
  return detections.map((detection: Detection) => {
    const newDetection = {};
    for (const [key, value] of Object.entries(detection)) {
      if (typeof value === "number") {
        newDetection[key] = value / currentRatio;
      } else {
        newDetection[key] = value;
      }
    }
    return newDetection as Detection;
  });
};

export const unadjustDetection = (detections: Detections, currentRatio: number): Detections => {
  return detections.map((detection: Detection) => {
    const newDetection = {};
    for (const [key, value] of Object.entries(detection)) {
      if (typeof value === "number") {
        newDetection[key] = value * currentRatio;
      } else {
        newDetection[key] = value;
      }
    }
    return newDetection as Detection;
  });
};
