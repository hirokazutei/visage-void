import { Detections, ContextType } from "../types";

export type DetectionIndexParams = {
  detections: Detections;
  index: number;
} & ContextType;
