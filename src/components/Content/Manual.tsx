import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import Context from "../../context";
import symbol from "../../symbol";
import { Label } from "../atom/Text";
import Space from "../atom/Space";
import DetectionView from "./DetectionsView";
import EditView from "./EditView";
import { messages } from "../../strings";

const Manual = () => {
  const { context, setContext } = useContext(Context);
  const { detections, imageInfo, editingIndex } = context;

  const addNew = () => {
    if (detections) {
      const averageDetection = (() => {
        const sumDetections = detections.reduce(
          (a, b) => {
            return {
              x: a.x + b.x,
              y: a.y + b.y,
              height: a.height + b.height,
              width: a.width + b.width,
            };
          },
          {
            x: 0,
            y: 0,
            height: 0,
            width: 0,
          }
        );
        const count = detections.length;
        return {
          x: Math.round(sumDetections.x / count),
          y: Math.round(sumDetections.y / count),
          height: Math.round(sumDetections.height / count),
          width: Math.round(sumDetections.width / count),
        };
      })();
      console.log(averageDetection);
      detections.push({
        ...averageDetection,
        hide: false,
        color: context.setting.color,
      });
      setContext({
        ...context,
        ...detections,
        ...(context.displaedMessages.dragToChange
          ? {}
          : {
              snackBarMessage: messages.draggable,
              displaedMessages: { dragToChange: true },
            }),
        editingIndex: detections.length - 1,
      });
    }
  };

  return (
    <>
      <Space.Stack size="medium" />
      <EditView />
      <DetectionView />
      {!!imageInfo.src && editingIndex === undefined && (
        <>
          <Space.Stack size="medium" />
          <Button
            style={{ backgroundColor: symbol.COLOR.button }}
            variant="contained"
            onClick={addNew}
          >
            <Label>ADD NEW</Label>
          </Button>
        </>
      )}
    </>
  );
};

export default Manual;
