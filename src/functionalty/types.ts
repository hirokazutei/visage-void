import { Detections, ContextType } from "../types";

export type DetectionIndexParams = {
  index: number;
} & ContextType;

export type ChangeDetectionParams = {
  detections: Detections;
} & ContextType;

export type SetEditingIndexParams = {
  editingIndex: number;
} & ContextType;
