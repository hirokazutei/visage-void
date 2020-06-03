import React, { useContext, useState } from "react";
import { Button } from "@material-ui/core";
import Context from "../../context";
import symbol from "../../symbol";
import { Label } from "../atom/Text";
import Space from "../atom/Space";
import DetectionView from "./DetectionsView";
import EditView from "./EditView";

const Manual = () => {
  const { context, setContext } = useContext(Context);
  const [selectedIndex, setSelected] = useState<Partial<number>>();
  const { detections, imageInfo } = context;

  const removeDetection = (index) => {
    if (detections) {
      detections.splice(index, 1);
      const newDetections = [...detections];
      setContext({ ...context, detections: newDetections });
    }
  };

  const showHideDetection = (index) => {
    if (detections && detections[index]) {
      detections[index].hide = !detections[index].hide;
      setContext({ ...context, ...detections });
    }
  };

  const onSelectedToEdit = (index) => {
    if (index === selectedIndex) {
      setSelected(undefined);
    } else if (detections && detections[index]) {
      setSelected(index);
    }
  };

  const doneEditing = () => {
    setSelected(undefined);
  };

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
      });
    }
  };

  return (
    <>
      <Space.Stack size="medium" />
      <EditView selectedIndex={selectedIndex} doneEditing={doneEditing} />
      <DetectionView
        detections={detections}
        selectedIndex={selectedIndex}
        showHideDetection={showHideDetection}
        onSelectedToEdit={onSelectedToEdit}
        removeDetection={removeDetection}
      />
      {!!imageInfo.src && selectedIndex === undefined && (
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
