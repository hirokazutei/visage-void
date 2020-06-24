import React from "react";
import { Slider } from "@material-ui/core";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import { useStore } from "../../../store";
import EmojiSelecter from "./EmojiSelecter";
import EmojiRandomizer from "./EmojiRadomizer";

const EmojiSetting = () => {
  const { state, actions } = useStore();
  const { emojiSizeMultiplier, globalEmoji } = state.setting;
  const setEmojiSizeMultiplier = (emojiSizeMultiplier: number) => {
    actions.setEmojiSizeMultiplier({ emojiSizeMultiplier });
  };
  const setGlobalEmoji = (emoji: string) => {
    actions.setGlobalEmoji({ globalEmoji: emoji });
  };

  return (
    <>
      <Label>EMOJI SIZE</Label>
      <Slider
        value={emojiSizeMultiplier}
        onChange={(_, newValue) => {
          setEmojiSizeMultiplier(Array.isArray(newValue) ? newValue[0] : newValue);
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
      <EmojiSelecter emoji={globalEmoji} setEmoji={setGlobalEmoji} title="GLOBAL EMOJI" />
      <Space.Stack size="medium" />
      <EmojiRandomizer />
    </>
  );
};

export default EmojiSetting;
