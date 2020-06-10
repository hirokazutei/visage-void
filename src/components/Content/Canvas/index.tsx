/* @flow */
import React, { useState, useContext, useEffect, CSSProperties } from "react";
import { GetApp as DownloadIcon } from "@material-ui/icons";
import Sketch from "react-p5";
import Context from "../../../context";
import { ContextType } from "../../../types";
import { Button } from "../../atom/Button";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import stateChange from "../../../functionalty/stateChange";
import { withinArea, adjustDetections } from "./utils";
import {
  handleFocusDetection,
  handleScaling,
  handleCursor,
  drawDetections,
  drawSelectedDetection,
} from "./canvasActions";
import constants from "./const";
import { P5 } from "./type";

type StyleKey = "downloadButton";

const styles: Record<StyleKey, CSSProperties> = {
  downloadButton: {
    display: "flex",
    flexDirection: "row",
  },
};

const CanvasWrapper = () => {
  // Context
  const { context, setContext } = useContext(Context);
  const { imageInfo, detections, editingIndex, editCount } = context;
  const { src, height, width, currentRatio } = imageInfo;
  // Local State
  const [p5Object, setP5Object] = useState<P5>();
  const [saveAfterNextDraw, setSaveAfterNextDraw] = useState<boolean>(false);
  const [image, setImage] = useState();
  // Workaround for a bug where first iteration of image being drawn doesn't show it
  const [loop, setLoop] = useState<number>(0);
  const [dragHandler, setDragHandler] = useState<{
    handler?: (args: { p5: any } & ContextType) => void;
  }>();

  // Workout to loop the canvas drawng
  useEffect(() => {
    p5Object?.loop();
  }, [p5Object, editCount, saveAfterNextDraw]);

  // Readjusting Sizes
  const adjDetections = detections
    ? adjustDetections(detections, currentRatio)
    : [];
  const adjHeight = height ? height / currentRatio : height;
  const adjWidth = width ? width / currentRatio : width;

  useEffect(() => {
    p5Object?.resizeCanvas(adjWidth, adjHeight);
  }, [p5Object, adjHeight, adjWidth]);

  if (!adjHeight || !adjWidth || !src) {
    return null;
  }
  const mouseInCanvas = (p5: P5): boolean => {
    return withinArea({
      xStart: 0,
      xEnd: adjWidth,
      yStart: 0,
      yEnd: adjHeight,
      x: p5.mouseX,
      y: p5.mouseY,
    });
  };
  const saveCanvas = () => {
    setDragHandler(undefined);
    setContext({ ...context, editingIndex: undefined });
    p5Object?.redraw();
    setSaveAfterNextDraw(true);
  };

  const setup = (p5: P5, canvasParentRef) => {
    setP5Object(p5);
    p5.createCanvas(adjWidth, adjHeight).parent(canvasParentRef);
    setImage(p5.loadImage(src));
    p5.rectMode(p5.CENTER);
    p5.noStroke();
  };

  const mousePressed = (p5: P5) => {
    // Function: Drag Items
    if (mouseInCanvas(p5)) {
      p5.loop();
      handleFocusDetection({ p5, context, setContext, adjDetections });
      handleScaling({ p5, context, setContext, setDragHandler, adjDetections });
    } else {
      setDragHandler(undefined);
    }
  };

  const mouseDragged = (p5: P5) => {
    if (mouseInCanvas(p5)) {
      p5.loop();
      if (dragHandler && dragHandler.handler) {
        dragHandler.handler({ p5, context, setContext });
      }
    }
  };

  const keyPressed = (p5: P5) => {
    switch (p5.keyCode) {
      // Delete the sselected detection
      case constants.keys.backspace:
      case constants.keys.delete:
        if (detections && editingIndex !== undefined) {
          stateChange.deleteDetection({
            index: editingIndex,
            context,
            setContext,
          });
        }
        break;
      // Switch the selected detection
      case constants.keys.tab:
        stateChange.incrementDetection({
          context,
          setContext,
        });
        break;
      // Defocus the selected detection
      case constants.keys.escape:
        stateChange.defocusDetection({
          context,
          setContext,
        });
        break;
      default:
        return;
    }
  };

  const draw = (p5: P5) => {
    if (image) {
      p5.image(image, 0, 0, adjWidth, adjHeight);
      handleCursor({ p5, context, setContext, adjDetections });
      drawDetections({ p5, context, setContext, adjDetections });
      drawSelectedDetection({ p5, context, setContext, adjDetections });
      if (saveAfterNextDraw) {
        p5.saveCanvas(`masked${Date.now()}`, "png");
        setSaveAfterNextDraw(false);
      }
      // Stops drawing when state isn't changing
      if (loop > 2) {
        p5.noLoop();
        setLoop(0);
      } else {
        setLoop(loop + 1);
      }
    }
  };

  return (
    <>
      <Button onClick={saveCanvas}>
        <div style={styles.downloadButton}>
          <Label>DOWNLOAD IMAGE</Label>
          <Space.Queue size="small" />
          <DownloadIcon color="secondary" />
        </div>
      </Button>
      <Space.Stack size="small" />
      <div style={{ display: "hidden" }}>
        <Sketch
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseDragged={mouseDragged}
          keyPressed={keyPressed}
        />
      </div>
    </>
  );
};

export default CanvasWrapper;
