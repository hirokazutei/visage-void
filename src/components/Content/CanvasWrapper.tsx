/* @flow */
import React, { useState, useContext, useEffect } from "react";
import Sketch from "react-p5";
import Context from "../../context";
import { Detection } from "../../types";

const resizerRadius = 6.5;
const resizerTolerance = 3;
// We enforce a minimum size of the boxes so there never ambiguity on which
// side we are resizing from.
const minDimension = 10;

const clamp: (num: number, min: number, max: number) => number = (
  num: number,
  min: number,
  max: number
) => (num < min ? min : num > max ? max : num);

const between: (num: number, min: number, max: number) => boolean = (
  num: number,
  min: number,
  max: number
) => num >= min && num < max;

const CanvasWrapper = () => {
  const { context, setContext } = useContext(Context);
  const { imageInfo, detections, setting, editingIndex, editCount } = context;
  const [p5Object, setP5Object] = useState();
  const { src, height, width } = imageInfo;
  const { heightMultiplier, widthMultiplier, type, color } = setting;
  const [image, setImage] = useState();
  const [dragHandler, setDragHandler] = useState<
    Partial<{
      handler: (
        newDetection: Detection,
        newPosition: { x: number; y: number }
      ) => void;
    }>
  >();

  // Workaround for a bug where first iteration of image being drawn doesn't show it
  const [loop, setLoop] = useState<number>(0);

  const setup = (p5, canvasParentRef) => {
    setP5Object(p5);
    if (width && height && src) {
      p5.createCanvas(width, height).parent(canvasParentRef);
      setImage(p5.loadImage(src));
    }
    p5.rectMode(p5.CENTER);
    p5.noStroke();
  };

  useEffect(() => {
    if (p5Object !== undefined) {
      // @ts-ignore: TS won't admit that this can't be undefined
      p5Object.loop();
    }
  }, [p5Object, editCount]);

  const mousePressed = (p5) => {
    if (
      !imageInfo ||
      !imageInfo.width ||
      !imageInfo.height ||
      !detections ||
      !between(p5.mouseX, 0, imageInfo.width) ||
      !between(p5.mouseY, 0, imageInfo.height)
    ) {
      return;
    }
    if (editingIndex === undefined) {
      let i = 0;
      for (const detection of detections) {
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
          setContext({ ...context, editingIndex: i });
          break;
        }
        ++i;
      }
    }
    if (editingIndex !== undefined) {
      const initialX = clamp(p5.mouseX, 0, imageInfo.width);
      const initialY = clamp(p5.mouseY, 0, imageInfo.height);
      // Copy it here so we can use it in its current state later on.
      const detection = { ...detections[editingIndex] };
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
      const nearW = Math.abs(detection.x - p5.mouseX) <= resizerTolerance;
      const nearE =
        Math.abs(detection.x + detection.width - p5.mouseX) <= resizerTolerance;
      const nearN = Math.abs(detection.y - p5.mouseY) <= resizerTolerance;
      const nearS =
        Math.abs(detection.y + detection.height - p5.mouseY) <=
        resizerTolerance;
      if (!(insideX || nearE || nearW) || !(insideY || nearN || nearS)) {
        setDragHandler(undefined);
        setContext({ ...context, editingIndex: undefined });
        return;
      }
      setDragHandler({
        // React doesn't like states that are functions, so we wrap it in an
        // object with a property.
        handler: (newDetection, { x: newX, y: newY }) => {
          const deltaX = newX - initialX;
          const deltaY = newY - initialY;
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
          newDetection.width = Math.max(newDetection.width, minDimension);
          newDetection.height = Math.max(newDetection.height, minDimension);
        },
      });
    } else {
      setDragHandler(undefined);
    }
  };

  const mouseDragged = (p5) => {
    if (editingIndex !== undefined && detections && imageInfo !== undefined) {
      if (
        !imageInfo.width ||
        !imageInfo.height ||
        !between(p5.mouseX, 0, imageInfo.width) ||
        !between(p5.mouseY, 0, imageInfo.height)
      ) {
        return;
      }
      const clampedX = clamp(p5.mouseX, 0, imageInfo.width);
      const clampedY = clamp(p5.mouseY, 0, imageInfo.height);

      const newDetections = [...detections];
      if (dragHandler && dragHandler.handler) {
        dragHandler.handler(newDetections[editingIndex], {
          x: clampedX,
          y: clampedY,
        });
      }
      setContext({
        ...context,
        detections: newDetections,
        editCount: context.editCount + 1,
      });
      p5.loop();
    }
  };

  const draw = (p5) => {
    if (image) {
      p5.image(image, 0, 0);
      if (detections) {
        p5.cursor("default");
        for (const detection of detections) {
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
          if (editingIndex === undefined) {
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
              p5.cursor("pointer");
            }
          }
        }
        if (editingIndex !== undefined) {
          const detection = detections[editingIndex];
          p5.stroke(0, 0, 0);
          p5.fill(255, 255, 255);
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
            p5.cursor("move");
          }
          p5.circle(
            detection.x + detection.width / 2,
            detection.y,
            resizerRadius
          );
          p5.circle(
            detection.x + detection.width / 2,
            detection.y + detection.height,
            resizerRadius
          );
          p5.circle(
            detection.x,
            detection.y + detection.height / 2,
            resizerRadius
          );
          p5.circle(
            detection.x + detection.width,
            detection.y + detection.height / 2,
            resizerRadius
          );
          const nearW = Math.abs(detection.x - p5.mouseX) <= resizerTolerance;
          const nearE =
            Math.abs(detection.x + detection.width - p5.mouseX) <=
            resizerTolerance;
          const nearN = Math.abs(detection.y - p5.mouseY) <= resizerTolerance;
          const nearS =
            Math.abs(detection.y + detection.height - p5.mouseY) <=
            resizerTolerance;
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
        if (loop > 1) {
          p5.noLoop();
          setLoop(0);
        } else {
          setLoop(loop + 1);
        }
      }
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseMoved={(p5) => p5.loop()}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
    />
  );
};

export default CanvasWrapper;
