import React, { CSSProperties } from "react";
import { Slider, Button } from "@material-ui/core";
import symbol from "../../../symbol";
import { PositionSize, ColorSetting, CoverType } from "../../../types";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import ColorSetter from "./ColorSetter";
import { useStore } from "../../../store";
import CoverTypeSelector from "./CoverTypeSelector";
import EmojiSelecter from "./EmojiSelecter";

type StyleKey = "sliderContainer" | "textContainer" | "buttonContainer";

const styles: Record<StyleKey, CSSProperties> = {
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textContainer: {
    width: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
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

  const selectedColor = detections && editingIndex !== undefined && detections[editingIndex].color;

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

  const setCoverType = (coverType: CoverType) => {
    if (detections && editingIndex !== undefined && detections[editingIndex]) {
      const newDetection = {
        ...detections[editingIndex],
        type: coverType,
        emojiChar: detections[editingIndex].emojiChar ? detections[editingIndex].emojiChar : setting.globalEmoji,
      };
      detections[editingIndex] = newDetection;
      actions.setDetections({ detections });
    }
  };

  const setEmoji = (emoji: string) => {
    if (detections && editingIndex !== undefined && detections[editingIndex]) {
      const newDetection = {
        ...detections[editingIndex],
        emojiChar: emoji,
      };
      detections[editingIndex] = newDetection;
      actions.setDetections({ detections });
    }
  };

  const setEmojiSize = (value: number) => {
    if (detections && editingIndex !== undefined && detections[editingIndex]) {
      const newDetection = {
        ...detections[editingIndex],
        emojiSize: value,
      };
      detections[editingIndex] = newDetection;
      actions.setDetections({ detections });
    }
  };

  const currentCoverType = (detections && editingIndex !== undefined && detections[editingIndex]?.type) || setting.type;

  const currentEmoji =
    (detections && editingIndex !== undefined && detections[editingIndex]?.emojiChar) || setting.globalEmoji;

  const currentEmojiSize = detections && editingIndex !== undefined ? detections[editingIndex]?.emojiSize : 0;

  const emojiMaxValue =
    imageInfo.width && imageInfo.height && imageInfo.width > imageInfo.height ? imageInfo.width : imageInfo.height;

  const multiplierSliders: Array<{
    text: string;
    value?: number;
    key: keyof PositionSize;
  }> = [
    {
      text: "H",
      value: detections && editingIndex !== undefined ? detections[editingIndex].height : 0,
      key: "height",
    },
    {
      text: "W",
      value: detections && editingIndex !== undefined ? detections[editingIndex].width : 0,
      key: "width",
    },
  ];

  return (
    <>
      <Space.Stack size="medium" />
      <Label>COVER TYPE</Label>
      <Space.Stack size="medium" />
      <div style={styles.buttonContainer}>
        <CoverTypeSelector coverType={currentCoverType} setCoverType={setCoverType} />
      </div>
      <Space.Stack size="small" />
      {currentCoverType === "EMOJI" ? (
        <>
          <Label>EMOJI SIZE</Label>
          <Slider
            value={currentEmojiSize}
            onChange={(_, newValue) => {
              setEmojiSize(Array.isArray(newValue) ? newValue[0] : newValue);
            }}
            aria-labelledby="continuous-slider"
            valueLabelFormat={(value) => {
              return `${value}`;
            }}
            min={0}
            max={(emojiMaxValue || 0) / 2}
            valueLabelDisplay="auto"
          />
        </>
      ) : (
        multiplierSliders.map(({ text, value, key }) => {
          const maxValue = key === "x" || key === "width" ? imageInfo.width : imageInfo.height;
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
                max={(maxValue || 0) / 2}
                valueLabelDisplay="auto"
              />
              <Space.Stack size="medium" />
            </div>
          );
        })
      )}
      <Space.Stack size="medium" />
      {currentCoverType === "EMOJI" ? (
        <EmojiSelecter emoji={currentEmoji} setEmoji={setEmoji} title="SELECT EMOJI" />
      ) : (
        <ColorSetter color={selectedColor ? selectedColor : setting.color} setColor={setColor} />
      )}
      <Space.Stack size="medium" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button style={{ backgroundColor: symbol.COLOR.button }} variant="contained" onClick={doneEditing}>
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
