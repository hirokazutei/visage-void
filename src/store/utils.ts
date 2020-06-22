import { State } from "./types";
import { Detections } from "../types";

export const addToDetection = ({ detections, imageInfo, setting }: State) => {
  if (detections?.length) {
    const averageDetection = (() => {
      const sumDetections = detections.reduce(
        (a, b) => {
          return {
            x: a.x + b.x,
            y: a.y + b.y,
            emojiSize: a.emojiSize + b.emojiSize,
            height: a.height + b.height,
            width: a.width + b.width,
          };
        },
        {
          x: 0,
          y: 0,
          emojiSize: 0,
          height: 0,
          width: 0,
        }
      );
      const count = detections.length;
      return {
        x: Math.round(sumDetections.x / count),
        y: Math.round(sumDetections.y / count),
        emojiSize: Math.round(sumDetections.emojiSize / count),
        height: Math.round(sumDetections.height / count),
        width: Math.round(sumDetections.width / count),
      };
    })();
    detections.push({
      ...averageDetection,
      hide: false,
      color: setting.color,
    });
    return { detections, editingIndex: detections.length - 1 };
  } else {
    const newDetection: Detections = [];
    newDetection.push({
      x: imageInfo.width ? Math.round(imageInfo.width / 2) : 0,
      y: imageInfo.height ? Math.round(imageInfo.height / 2) : 0,
      height: imageInfo.height ? Math.round(imageInfo.height / 10) : 50,
      width: imageInfo.width ? Math.round(imageInfo.width / 10) : 50,
      emojiSize: imageInfo.width ? Math.round(imageInfo.width / 10) : 50,
      hide: false,
      color: setting.color,
    });
    return { detections, editingIndex: 0 };
  }
};
