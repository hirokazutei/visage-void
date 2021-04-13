import { Detections } from "../../../types";
import { between, clamp, unadjustDetection } from "./utils";
import constants from "./const";
import { CanvasHandler, P5 } from "./type";
import { ContextType } from "../../../store/types";
import { preventBehavior } from "../../../store/utils";

export const handleFocusDetection = ({
  p5,
  state,
  actions,
  adjDetections,
}: CanvasHandler & { adjDetections: Detections }) => {
  const { editingIndex } = state;
  if (editingIndex === undefined && adjDetections) {
    let indexSet;
    adjDetections.forEach((detection, editingIndex) => {
      const insideX = between(p5.mouseX, detection.x, detection.x + detection.width);
      const insideY = between(p5.mouseY, detection.y, detection.y + detection.height);
      if (insideX && insideY) {
        actions.focusDetection({ index: editingIndex });
        indexSet = editingIndex;
      }
    });
    return indexSet;
  }
};

export const handleScaling = ({
  p5,
  state,
  actions,
  setDragHandler,
  adjDetections,
  indexSet,
}: CanvasHandler & {
  setDragHandler: (dragHander?: { handler?: (args: { p5: P5 } & ContextType) => void }) => void;
  adjDetections: Detections;
  indexSet: number;
}): void => {
  const { editingIndex, imageInfo, setting } = state;
  const { width, height } = imageInfo;
  const { mouseX, mouseY } = p5;
  if (!width || !height || !adjDetections) {
    return;
  }
  if ((editingIndex || indexSet) !== undefined) {
    const initialX = clamp(mouseX, 0, width);
    const initialY = clamp(mouseY, 0, height);
    // Copy it here so we can use it in its current state later on.
    const detection = { ...adjDetections[editingIndex || indexSet] };
    const isEmoji = detection.type ? detection.type === "EMOJI" : setting.type === "EMOJI";
    const insideX = between(mouseX, detection.x, detection.x + (isEmoji ? detection.emojiSize : detection.width));
    const insideY = between(mouseY, detection.y, detection.y + (isEmoji ? detection.emojiSize : detection.height));
    const nearW = Math.abs(detection.x - p5.mouseX) <= constants.resizerTolerance;
    const nearE =
      Math.abs(detection.x + (isEmoji ? detection.emojiSize : detection.width) - p5.mouseX) <=
      constants.resizerTolerance;
    const nearN = Math.abs(detection.y - p5.mouseY) <= constants.resizerTolerance;
    const nearS =
      Math.abs(detection.y + (isEmoji ? detection.emojiSize : detection.height) - p5.mouseY) <=
      constants.resizerTolerance;

    if (!(insideX || nearE || nearW) || !(insideY || nearN || nearS)) {
      setDragHandler(undefined);
      document.removeEventListener("touchmove", preventBehavior);
      actions.defocusDetection();
      return;
    }
    document.addEventListener("touchmove", preventBehavior, { passive: false });
    setDragHandler({
      // React doesn't like states that are functions, so we wrap it in an
      // object with a property.
      handler: ({ p5, state, actions }: CanvasHandler) => {
        const { mouseX, mouseY } = p5;
        const { imageInfo, editingIndex } = state;
        const { width, height, currentRatio } = imageInfo;
        if (!width || !height || !adjDetections || editingIndex === undefined) {
          return;
        }

        const newDetections = [...adjDetections];
        const newDetection = newDetections[editingIndex];
        const clampedX = clamp(mouseX, 0, width);
        const clampedY = clamp(mouseY, 0, height);
        const deltaX = clampedX - initialX;
        const deltaY = clampedY - initialY;
        let didResize = false;
        if ((nearN && nearS) || (nearE && nearW)) {
          console.warn("Yikes, we're resizing both sides at once?!");
        }
        if (nearN && (insideX || nearE || nearW)) {
          // Resize the top
          newDetection.y = detection.y + deltaY;
          if (isEmoji) {
            newDetection.emojiSize = detection.emojiSize - deltaY / 2;
          } else {
            newDetection.height = detection.height - deltaY;
          }
          didResize = true;
        }
        if (nearS && (insideX || nearE || nearW)) {
          // Resize the bottom
          newDetection.y = detection.y;
          if (isEmoji) {
            newDetection.emojiSize = detection.emojiSize + deltaY;
          } else {
            newDetection.height = detection.height + deltaY;
          }
          didResize = true;
        }
        if (nearW && (insideY || nearN || nearS)) {
          // Resize the left
          newDetection.x = detection.x + deltaX;
          if (isEmoji) {
            newDetection.emojiSize = detection.emojiSize - deltaX;
          } else {
            newDetection.width = detection.width - deltaX;
          }
          didResize = true;
        }
        if (nearE && (insideY || nearN || nearS)) {
          // Resize the right
          newDetection.x = detection.x;
          if (isEmoji) {
            newDetection.emojiSize = detection.emojiSize + deltaX;
          } else {
            newDetection.width = detection.width + deltaX;
          }
          didResize = true;
        }
        if (!didResize && insideX && insideY) {
          // Then it must be a move!
          newDetection.x = clamp(detection.x + deltaX, 0, width - (isEmoji ? detection.emojiSize : detection.width));
          newDetection.y = clamp(detection.y + deltaY, 0, height - (isEmoji ? detection.emojiSize : detection.height));
        }
        if (newDetection.width < 0) {
          newDetection.width = -newDetection.width;
          newDetection.x -= newDetection.width;
        }
        if (newDetection.height < 0) {
          newDetection.height = -newDetection.height;
          newDetection.y -= newDetection.height;
        }
        if (newDetection.emojiSize < 1) {
          newDetection.emojiSize = -newDetection.emojiSize;
        }
        newDetection.width = Math.max(newDetection.width, constants.minDimension);
        newDetection.height = Math.max(newDetection.height, constants.minDimension);
        newDetection.emojiSize = Math.max(newDetection.emojiSize, constants.minDimension);
        const unadjustedDetections = unadjustDetection(newDetections, currentRatio);

        actions.setDetections({ detections: unadjustedDetections });
      },
    });
  }
};

export const handleCursor = ({ p5, state, adjDetections }: CanvasHandler & { adjDetections: Detections }) => {
  const { mouseX, mouseY } = p5;
  const { editingIndex, setting } = state;
  p5?.cursor("default");
  if (adjDetections) {
    if (editingIndex === undefined) {
      for (const detection of adjDetections) {
        const isEmoji = detection.type ? detection.type === "EMOJI" : setting.type === "EMOJI";
        const insideX = between(mouseX, detection.x, detection.x + (isEmoji ? detection.emojiSize : detection.width));
        const insideY = between(mouseY, detection.y, detection.y + (isEmoji ? detection.emojiSize : detection.height));
        if (insideX && insideY) {
          p5.cursor("pointer");
        }
      }
    } else {
      const detection = adjDetections[editingIndex];
      const isEmoji = detection.type ? detection.type === "EMOJI" : setting.type === "EMOJI";
      const insideX = between(mouseX, detection.x, detection.x + (isEmoji ? detection.emojiSize : detection.width));
      const insideY = between(mouseY, detection.y, detection.y + (isEmoji ? detection.emojiSize : detection.height));
      if (insideX && insideY) {
        p5.cursor("move");
      }
      const nearW = Math.abs(detection.x - mouseX) <= constants.resizerTolerance;
      const nearE =
        Math.abs(detection.x + (isEmoji ? detection.emojiSize : detection.width) - mouseX) <=
        constants.resizerTolerance;
      const nearN = Math.abs(detection.y - mouseY) <= constants.resizerTolerance;
      const nearS =
        Math.abs(detection.y + (isEmoji ? detection.emojiSize : detection.height) - mouseY) <=
        constants.resizerTolerance;
      if ((nearN && nearW) || (nearS && nearE)) {
        p5.cursor("nwse-resize");
      } else if ((nearN && nearE) || (nearS && nearW)) {
        p5.cursor("nesw-resize");
      } else if (insideY && (nearW || nearE)) {
        p5.cursor("ew-resize");
      } else if (insideX && (nearN || nearS)) {
        p5.cursor("ns-resize");
      }
    }
  }
};

export const drawDetections = ({ p5, state, adjDetections }: CanvasHandler & { adjDetections: Detections }) => {
  const { setting } = state;
  const { heightMultiplier, widthMultiplier, emojiSizeMultiplier, type, color, globalEmoji } = setting;
  if (adjDetections) {
    for (const detection of adjDetections) {
      const red = detection?.color?.red ?? color.red;
      const green = detection?.color?.green ?? color.green;
      const blue = detection?.color?.blue ?? color.blue;
      p5.noStroke();
      p5.fill(red, green, blue);
      if (detection.hide) {
        continue;
      }
      const height = (detection.height * heightMultiplier) / 100;
      const width = (detection.width * widthMultiplier) / 100;
      const emojiSize = (detection.emojiSize * emojiSizeMultiplier) / 100;
      const x = detection.x + detection.width / 2;
      const y = detection.y + detection.height / 2;
      const emojiX = detection.x + detection.emojiSize / 2 - (emojiSize - detection.emojiSize) / 4;
      const emojiY = detection.y + detection.emojiSize / 2 - (emojiSize - detection.emojiSize) / 4;
      const detectionCoverType = detection?.type ?? type;
      switch (detectionCoverType) {
        case "BOX":
          p5.rect(x, y, width, height);
          break;
        case "OVAL":
          p5.ellipse(x, y, width, height);
          break;
        case "EMOJI":
          p5.textSize(emojiSize);
          p5.text(detection?.emojiChar ?? globalEmoji, emojiX, emojiY);
          break;
        default:
          break;
      }
    }
  }
};

export const drawSelectedDetection = ({ p5, state, adjDetections }: CanvasHandler & { adjDetections: Detections }) => {
  const { editingIndex, setting } = state;
  if (editingIndex !== undefined && adjDetections) {
    const detection = adjDetections[editingIndex];
    const isEmoji = detection.type ? detection.type === "EMOJI" : setting.type === "EMOJI";
    const width = isEmoji ? detection.emojiSize : detection.width;
    const height = isEmoji ? detection.emojiSize : detection.height;
    p5.stroke(0, 0, 0);
    p5.fill(255, 255, 255);
    p5.circle(detection.x + width / 2, detection.y, constants.resizerRadius);
    p5.circle(detection.x + width / 2, detection.y + height, constants.resizerRadius);
    p5.circle(detection.x, detection.y + height / 2, constants.resizerRadius);
    p5.circle(detection.x + width, detection.y + height / 2, constants.resizerRadius);
  }
};
