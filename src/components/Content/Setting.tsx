import React, { useContext, CSSProperties } from "react";
import { Slider, Button, ButtonGroup } from "@material-ui/core";
import Context from "../../context";
import { COVER_TYPE } from "../../const";
import { CoverType, ColorSetting } from "../../types";
import { Label } from "../atom/Text";
import Space from "../atom/Space";
import ColorSetter from "./ColorSetter";

const styles: {
  buttonGroupContainer: CSSProperties;
  colorSliderContianer: CSSProperties;
  colorSetting: CSSProperties;
} = {
  buttonGroupContainer: {
    display: "flex",
    justifyContent: "center",
  },
  colorSliderContianer: {
    display: "flex",
    minWidth: 200,
    flexDirection: "row",
  },
  colorSetting: {
    display: "flex",
    flexDirection: "column",
  },
};

const Setting = () => {
  const { context, setContext } = useContext(Context);
  const {
    heightMultiplier,
    widthMultiplier,
    type: currentType,
    color,
  } = context.setting;
  const setHeightMultipler = (heightMultiplier: number) => {
    setContext({
      ...context,
      setting: { ...context.setting, heightMultiplier },
    });
  };
  const setWidthMutiplier = (widthMultiplier: number) => {
    setContext({
      ...context,
      setting: { ...context.setting, widthMultiplier },
    });
  };
  const setType = (type: CoverType) => {
    setContext({
      ...context,
      setting: { ...context.setting, type },
    });
  };
  const setColor = (color: ColorSetting) => {
    setContext({
      ...context,
      setting: {
        ...context.setting,
        color: { ...context.setting.color, ...color },
      },
    });
  };

  const sliders = [
    {
      text: "HEIGHT MULTIPLIER",
      value: heightMultiplier,
      setter: setHeightMultipler,
    },
    {
      text: "WIDTH MULTIPLIER",
      value: widthMultiplier,
      setter: setWidthMutiplier,
    },
  ];

  return (
    <>
      <Space.Stack size="medium" />
      <Label>COVER TYPE</Label>
      <Space.Stack size="medium" />
      <div style={styles.buttonGroupContainer}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {COVER_TYPE.map((type, index) => {
            const borderRadius = (() => {
              if (index === 0) return "8px 0px 0px 8px";
              else if (index === COVER_TYPE.length - 1) {
                return "0px 8px 8px 0px";
              }
              return 0;
            })();
            return (
              <Button
                key={type}
                variant={type === currentType ? "contained" : "outlined"}
                onClick={() => setType(type)}
                style={{ borderRadius }}
              >
                {type}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <Space.Stack size="large" />
      {sliders.map(({ text, value, setter }) => {
        return (
          <>
            <Label>{text}</Label>
            <Slider
              value={value}
              onChange={(_, newValue) => {
                setter(Array.isArray(newValue) ? newValue[0] : newValue);
              }}
              aria-labelledby="continuous-slider"
              valueLabelFormat={(value) => {
                return `${value}%`;
              }}
              min={50}
              max={200}
              valueLabelDisplay="auto"
            />
            <Space.Stack size="medium" />
          </>
        );
      })}
      <ColorSetter color={color} setColor={setColor} />
    </>
  );
};

export default Setting;
