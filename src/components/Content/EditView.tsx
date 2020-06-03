import React, { useContext, CSSProperties } from "react";
import { Slider, Button, Paper } from "@material-ui/core";
import Context from "../../context";
import symbol from "../../symbol";
import { PositionSize, ColorSetting } from "../../types";
import { Label } from "../atom/Text";
import Space from "../atom/Space";
import ColorSetter from "./ColorSetter";

const styles: {
  sliderContainer: CSSProperties;
  textContainer: CSSProperties;
} = {
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    width: 20,
  },
};

type Props = {
  selectedIndex?: number;
  doneEditing: () => void;
};

const EditView = ({ selectedIndex, doneEditing }: Props) => {
  const { context, setContext } = useContext(Context);
  const { imageInfo, detections } = context;
  if (selectedIndex === undefined) {
    return null;
  }

  const selectedColor =
    detections &&
    selectedIndex !== undefined &&
    detections[selectedIndex].color;

  const setColor = (color: ColorSetting) => {
    if (
      detections &&
      selectedIndex !== undefined &&
      detections[selectedIndex]
    ) {
      detections[selectedIndex] = {
        ...detections[selectedIndex],
        ...{ color },
      };
      setContext({
        ...context,
        ...detections,
      });
    }
  };

  const setDetection = (detection: PositionSize) => {
    if (
      detections &&
      selectedIndex !== undefined &&
      detections[selectedIndex]
    ) {
      detections[selectedIndex] = {
        ...detections[selectedIndex],
        ...detection,
      };
      setContext({
        ...context,
        ...detections,
      });
    }
  };

  const multiplierSliders: Array<{
    text: string;
    value?: number;
    key: keyof PositionSize;
  }> = [
    {
      text: "X",
      value:
        detections && selectedIndex !== undefined
          ? detections[selectedIndex].x
          : 0,
      key: "x",
    },
    {
      text: "Y",
      value:
        detections && selectedIndex !== undefined
          ? detections[selectedIndex].y
          : 0,
      key: "y",
    },
    {
      text: "H",
      value:
        detections && selectedIndex !== undefined
          ? detections[selectedIndex].height
          : 0,
      key: "height",
    },
    {
      text: "W",
      value:
        detections && selectedIndex !== undefined
          ? detections[selectedIndex].width
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
        <ColorSetter
          color={selectedColor ? selectedColor : context.setting.color}
          setColor={setColor}
        />
      </Paper>
      <Space.Stack size="medium" />
      <Button
        style={{ backgroundColor: symbol.COLOR.button }}
        variant="contained"
        onClick={doneEditing}
      >
        <Label>DONE EDITING</Label>
      </Button>
    </>
  );
};

export default EditView;
