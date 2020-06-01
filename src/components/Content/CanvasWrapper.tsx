/* @flow */
import React, { useState, useContext } from "react";
import Sketch from "react-p5";
import Context from "../../context";

const CanvasWrapper = () => {
  const { imageInfo, detections, setting } = useContext(Context).context;
  const { src, height, width } = imageInfo;
  const { heightMultiplier, widthMultiplier, type, color } = setting;
  const { red, green, blue } = color;
  const [image, setImage] = useState();
  const setup = (p5, canvasParentRef) => {
    if (width && height && src) {
      p5.createCanvas(width, height).parent(canvasParentRef);
      setImage(p5.loadImage(src));
    }
    p5.rectMode(p5.CENTER);
    p5.noStroke();
  };

  const draw = (p5) => {
    p5.fill(red, green, blue);
    p5.stroke(red, green, blue);
    if (image) {
      p5.image(image, 0, 0);
    }
    if (detections) {
      for (const detection of detections) {
        const height = (detection.box.height * heightMultiplier) / 100;
        const width = (detection.box.width * widthMultiplier) / 100;
        const x = detection.box.x + detection.box.width / 2;
        const y = detection.box.y + detection.box.height * 0.4;
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

  return <Sketch setup={setup} draw={draw} />;
};

export default CanvasWrapper;
