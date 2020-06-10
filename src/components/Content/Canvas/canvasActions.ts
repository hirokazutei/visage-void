import { ContextType, Detections } from "../../../types";
import { between, clamp, unadjustDetection } from "./utils";
import stateChange from "../../../functionalty/stateChange";
import constants from "./const";
import { P5Context } from "./type";

export const handleFocusDetection = ({
  p5,
  context,
  setContext,
  adjDetections,
}: P5Context & { adjDetections: Detections }) => {
  const { editingIndex } = context;
  if (editingIndex === undefined && adjDetections) {
    adjDetections.forEach((detection, editingIndex) => {
      const insideX = between(
        p5.mouseX,
        detection.x,
        detection.x + detection.width
      );
      const insideY = between(
        p5.mouseY,
        detection.y,
        detection.y + detection.height
      );
      if (insideX && insideY) {
        stateChange.focusDetection({ context, setContext, editingIndex });
        return;
      }
    });
  }
};

export const handleScaling = ({
  p5,
  context,
  setContext,
  setDragHandler,
  adjDetections,
}: P5Context & {
  setDragHandler: (dragHander?: {
    handler?: (args: { p5: any } & ContextType) => void;
  }) => void;
  adjDetections: Detections;
}): void => {
  const { editingIndex, imageInfo } = context;
  const { width, height } = imageInfo;
  const { mouseX, mouseY } = p5;
  if (!width || !height || !adjDetections) {
    return;
  }
  if (editingIndex !== undefined) {
    const initialX = clamp(mouseX, 0, width);
    const initialY = clamp(mouseY, 0, height);
    // Copy it here so we can use it in its current state later on.
    const detection = { ...adjDetections[editingIndex] };
    const insideX = between(mouseX, detection.x, detection.x + detection.width);
    const insideY = between(
      mouseY,
      detection.y,
      detection.y + detection.height
    );
    const nearW =
      Math.abs(detection.x - p5.mouseX) <= constants.resizerTolerance;
    const nearE =
      Math.abs(detection.x + detection.width - p5.mouseX) <=
      constants.resizerTolerance;
    const nearN =
      Math.abs(detection.y - p5.mouseY) <= constants.resizerTolerance;
    const nearS =
      Math.abs(detection.y + detection.height - p5.mouseY) <=
      constants.resizerTolerance;

    if (!(insideX || nearE || nearW) || !(insideY || nearN || nearS)) {
      setDragHandler(undefined);
      stateChange.defocusDetection({ context, setContext });
      return;
    }
    setDragHandler({
      // React doesn't like states that are functions, so we wrap it in an
      // object with a property.
      handler: ({ p5, context, setContext }: P5Context) => {
        const { mouseX, mouseY } = p5;
        const { imageInfo, editingIndex } = context;
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
          newDetection.height = detection.height - deltaY;
          didResize = true;
        }
        if (nearS && (insideX || nearE || nearW)) {
          // Resize the bottom
          newDetection.y = detection.y;
          newDetection.height = detection.height + deltaY;
          didResize = true;
        }
        if (nearW && (insideY || nearN || nearS)) {
          // Resize the left
          newDetection.x = detection.x + deltaX;
          newDetection.width = detection.width - deltaX;
          didResize = true;
        }
        if (nearE && (insideY || nearN || nearS)) {
          // Resize the right
          newDetection.x = detection.x;
          newDetection.width = detection.width + deltaX;
          didResize = true;
        }
        if (!didResize && insideX && insideY) {
          // Then it must be a move!
          newDetection.x = clamp(
            detection.x + deltaX,
            0,
            imageInfo!.width! - detection.width
          );
          newDetection.y = clamp(
            detection.y + deltaY,
            0,
            imageInfo!.height! - detection.height
          );
        }
        if (newDetection.width < 0) {
          newDetection.width = -newDetection.width;
          newDetection.x -= newDetection.width;
        }
        if (newDetection.height < 0) {
          newDetection.height = -newDetection.height;
          newDetection.y -= newDetection.height;
        }
        newDetection.width = Math.max(
          newDetection.width,
          constants.minDimension
        );
        newDetection.height = Math.max(
          newDetection.height,
          constants.minDimension
        );
        const unadjustedDetections = unadjustDetection(
          newDetections,
          currentRatio
        );

        stateChange.changeDetection({
          context,
          setContext,
          detections: unadjustedDetections,
        });
      },
    });
  }
};

export const handleCursor = ({
  p5,
  context,
  adjDetections,
}: P5Context & { adjDetections: Detections }) => {
  const { mouseX, mouseY } = p5;
  const { editingIndex } = context;
  p5?.cursor("default");
  if (adjDetections) {
    if (editingIndex === undefined) {
      for (const detection of adjDetections) {
        const insideX = between(
          mouseX,
          detection.x,
          detection.x + detection.width
        );
        const insideY = between(
          mouseY,
          detection.y,
          detection.y + detection.height
        );
        if (insideX && insideY) {
          p5.cursor("pointer");
        }
      }
    } else {
      const detection = adjDetections[editingIndex];
      const insideX = between(
        mouseX,
        detection.x,
        detection.x + detection.width
      );
      const insideY = between(
        mouseY,
        detection.y,
        detection.y + detection.height
      );
      if (insideX && insideY) {
        p5.cursor("move");
      }
      const nearW =
        Math.abs(detection.x - mouseX) <= constants.resizerTolerance;
      const nearE =
        Math.abs(detection.x + detection.width - mouseX) <=
        constants.resizerTolerance;
      const nearN =
        Math.abs(detection.y - mouseY) <= constants.resizerTolerance;
      const nearS =
        Math.abs(detection.y + detection.height - mouseY) <=
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

export const drawDetections = ({
  p5,
  context,
  adjDetections,
}: P5Context & { adjDetections: Detections }) => {
  const { setting } = context;
  const { heightMultiplier, widthMultiplier, type, color } = setting;
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
      const x = detection.x + detection.width / 2;
      const y = detection.y + detection.height / 2;
      switch (type) {
        case "BOX":
          p5.rect(x, y, width, height);
          break;
        case "OVAL":
          p5.ellipse(x, y, width, height);
          break;
        default:
          break;
      }
    }
  }
};

export const drawSelectedDetection = ({
  p5,
  context,
  adjDetections,
}: P5Context & { adjDetections: Detections }) => {
  const { editingIndex } = context;
  if (editingIndex !== undefined && adjDetections) {
    const detection = adjDetections[editingIndex];
    p5.stroke(0, 0, 0);
    p5.fill(255, 255, 255);
    p5.circle(
      detection.x + detection.width / 2,
      detection.y,
      constants.resizerRadius
    );
    p5.circle(
      detection.x + detection.width / 2,
      detection.y + detection.height,
      constants.resizerRadius
    );
    p5.circle(
      detection.x,
      detection.y + detection.height / 2,
      constants.resizerRadius
    );
    p5.circle(
      detection.x + detection.width,
      detection.y + detection.height / 2,
      constants.resizerRadius
    );
  }
};
