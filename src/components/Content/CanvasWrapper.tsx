/* @flow */
import React, { useState, useContext, useEffect } from "react";
import Sketch from "react-p5";
import Context from "../../context";

const CanvasWrapper = () => {
  const { context, setContext } = useContext(Context);
  const { imageInfo, detections, setting, editingIndex, editCount } = context;
  const [p5Object, setP5Object] = useState();
  const { src, height, width } = imageInfo;
  const { heightMultiplier, widthMultiplier, type, color } = setting;
  const [image, setImage] = useState();

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

  const mouseDragged = (p5) => {
    if (editingIndex !== undefined && detections && imageInfo !== undefined) {
      if (
        p5.mouseX < 0 ||
        p5.mouseY < 0 ||
        !imageInfo.width ||
        !imageInfo.height ||
        p5.mouseX > imageInfo.width ||
        p5.mouseY > imageInfo.height
      ) {
        return;
      }
      const { width, height } = detections[editingIndex];
      detections[editingIndex] = {
        ...detections[editingIndex],
        x: p5.mouseX - width / 2,
        y: p5.mouseY - height / 2,
      };
      const newDetections = [...detections];
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
        for (const detection of detections) {
          const red = detection?.color?.red || color.red;
          const green = detection?.color?.green || color.green;
          const blue = detection?.color?.blue || color.blue;
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
        if (loop > 1) {
          p5.noLoop();
          setLoop(0);
        } else {
          setLoop(loop + 1);
        }
      }
    }
  };

  return <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} />;
};

export default CanvasWrapper;
