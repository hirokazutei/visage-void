import React, { CSSProperties } from "react";
import { Slider, Button, Paper } from "@material-ui/core";
import symbol from "../../../symbol";
import { PositionSize, ColorSetting } from "../../../types";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import ColorSetter from "./ColorSetter";
import { useStore } from "../../../store";

type StyleKey = "sliderContainer" | "textContainer";

const styles: Record<StyleKey, CSSProperties> = {
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    width: 20,
  },
};

const EditView = () => {
  const { state, actions } = useStore();
  const { imageInfo, detections, editingIndex, setting } = state;

  const doneEditing = () => {
    actions.defocusDetection();
  };

  if (editingIndex === undefined) {
    return null;
  }

  const selectedColor =
    detections && editingIndex !== undefined && detections[editingIndex].color;

  const setColor = (color: ColorSetting) => {
    if (detections && editingIndex !== undefined && detections[editingIndex]) {
      detections[editingIndex] = {
        ...detections[editingIndex],
        ...{ color },
      };
      actions.setDetections({ detections });
    }
  };

  const setDetection = (detection: PositionSize) => {
    if (detections && editingIndex !== undefined && detections[editingIndex]) {
      detections[editingIndex] = {
        ...detections[editingIndex],
        ...detection,
      };
      actions.setDetections({ detections });
    }
  };

  const multiplierSliders: Array<{
    text: string;
    value?: number;
    key: keyof PositionSize;
  }> = [
    {
      text: "H",
      value:
        detections && editingIndex !== undefined
          ? detections[editingIndex].height
          : 0,
      key: "height",
    },
    {
      text: "W",
      value:
        detections && editingIndex !== undefined
          ? detections[editingIndex].width
          : 0,
      key: "width",
    },
  ];

  return (
    <>
      <Paper
        style={{
          backgroundColor: symbol.COLOR.pageMarker,
          padding: symbol.SPACE.large,
        }}
      >
        {multiplierSliders.map(({ text, value, key }) => {
          const maxValue =
            key === "x" || key === "width" ? imageInfo.width : imageInfo.height;
          return (
            <div style={styles.sliderContainer} key={key}>
              <div style={styles.textContainer}>
                <Label>{text}</Label>
              </div>
              <Space.Queue size="medium" />
              <Slider
                value={value}
                step={1}
                onChange={(_, newValue) => {
                  const newDetection = {
                    [key]: Array.isArray(newValue) ? newValue[0] : newValue,
                  };
                  setDetection(newDetection);
                }}
                min={0}
                max={maxValue || 0}
                valueLabelDisplay="auto"
              />
              <Space.Stack size="medium" />
            </div>
          );
        })}
        <Space.Stack size="medium" />
        <ColorSetter
          color={selectedColor ? selectedColor : setting.color}
          setColor={setColor}
        />
      </Paper>
      <Space.Stack size="medium" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={{ backgroundColor: symbol.COLOR.button }}
          variant="contained"
          onClick={doneEditing}
        >
          <Label>DONE EDITING</Label>
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: symbol.COLOR.error,
            color: symbol.COLOR.white,
          }}
          onClick={() => {
            if (detections && editingIndex !== undefined) {
              actions.deleteDetection({
                index: editingIndex,
              });
            }
          }}
        >
          DELETE
        </Button>
      </div>
    </>
  );
};

export default EditView;
