import React, { CSSProperties } from "react";
import { CoverType } from "../../../types";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import { useStore } from "../../../store";
import SolidMaskSetting from "./SolidMaskSetting";
import EmojiSetting from "./EmojiSetting";
import CoverTypeSelector from "./CoverTypeSelector";

type StyleKey = "buttonGroupContainer" | "colorSetting";

const styles: Record<StyleKey, CSSProperties> = {
  buttonGroupContainer: {
    display: "flex",
    justifyContent: "center",
  },
  colorSetting: {
    display: "flex",
    flexDirection: "column",
  },
};

const Setting = () => {
  const { state, actions } = useStore();
  const { type } = state.setting;

  const onSelectCoverType = (coverType: CoverType) => {
    actions.setType({ coverType });
  };

  return (
    <>
      <Space.Stack size="medium" />
      <Label>COVER TYPE</Label>
      <Space.Stack size="medium" />
      <div style={styles.buttonGroupContainer}>
        <CoverTypeSelector coverType={type} setCoverType={onSelectCoverType} />
      </div>
      <Space.Stack size="large" />
      {type !== "EMOJI" ? <SolidMaskSetting /> : <EmojiSetting />}
    </>
  );
};

export default Setting;
