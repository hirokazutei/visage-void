import React from "react";
import { Slider } from "@material-ui/core";
import { ColorSetting } from "../../../types";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import ColorSetter from "./ColorSetter";
import { useStore } from "../../../store";

const SolidMaskSetting = () => {
  const { state, actions } = useStore();
  const { heightMultiplier, widthMultiplier, color } = state.setting;
  const setHeightMultipler = (heightMultiplier: number) => {
    actions.setHeightMultiplier({ heightMultiplier });
  };
  const setWidthMutiplier = (widthMultiplier: number) => {
    actions.setWidthMultiplier({ widthMultiplier });
  };
  const setColor = (color: ColorSetting) => {
    actions.setColor({ color });
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
      {sliders.map(({ text, value, setter }) => {
        return (
          <div key={text}>
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
          </div>
        );
      })}
      <ColorSetter color={color} setColor={setColor} />
    </>
  );
};

export default SolidMaskSetting;
