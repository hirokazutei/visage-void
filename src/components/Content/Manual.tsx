import React, { useContext, CSSProperties, useState } from "react";
import { Slider, Button, Checkbox, Paper } from "@material-ui/core";
import Context from "../../context";
import symbol from "../../symbol";
import { PositionSize, Detection, ColorSetting } from "../../types";
import { Label } from "../atom/Text";
import Space from "../atom/Space";
import { PageMarker } from "../atom/Paper";
import ColorSetter from "./ColorSetter";

const styles: {
  detectionPageMarkerContent: CSSProperties;
  showToggleContainer: CSSProperties;
  buttonContainer: CSSProperties;
  sliderContainer: CSSProperties;
  textContainer: CSSProperties;
} = {
  detectionPageMarkerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showToggleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    width: 20,
  },
};

const Manual = () => {
  const { context, setContext } = useContext(Context);
  const [selectedIndex, setSelected] = useState<Partial<number>>();
  const detections = context.detections;
  const selectedColor =
    detections &&
    selectedIndex !== undefined &&
    detections[selectedIndex].color;
  const imageInfo = context.imageInfo;
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

  const onSelected = (index) => {
    if (index === selectedIndex) {
      setSelected(undefined);
    } else if (detections && detections[index]) {
      setSelected(index);
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
      <Space.Stack size="medium" />
      {selectedIndex !== undefined && (
        <>
          <Paper
            style={{
              backgroundColor: symbol.COLOR.pageMarker,
              padding: symbol.SPACE.large,
            }}
          >
            {multiplierSliders.map(({ text, value, key }) => {
              const maxValue =
                key === "x" || key === "width"
                  ? imageInfo.width
                  : imageInfo.height;
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
        </>
      )}
      {detections &&
        detections.map((detection: Detection, index: number) => {
          return (
            <div key={index}>
              <PageMarker
                customStyle={{
                  ...(selectedIndex === index
                    ? { backgroundColor: symbol.COLOR.button }
                    : {}),
                }}
              >
                <div style={styles.detectionPageMarkerContent}>
                  <div style={styles.showToggleContainer}>
                    <Label>SHOW:</Label>
                    <Checkbox
                      checked={!detection.hide}
                      onChange={() => showHideDetection(index)}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </div>
                  <div style={styles.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onSelected(index)}
                    >
                      EDIT
                    </Button>
                    <Space.Queue size="small" />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: symbol.COLOR.error,
                        color: symbol.COLOR.white,
                      }}
                      onClick={() => removeDetection(index)}
                    >
                      REMOVE
                    </Button>
                  </div>
                </div>
              </PageMarker>
              <Space.Stack size="small" />
            </div>
          );
        })}
      <Button
        style={{ backgroundColor: symbol.COLOR.button }}
        variant="contained"
        onClick={addNew}
      >
        <Label>ADD NEW</Label>
      </Button>
    </>
  );
};

export default Manual;
