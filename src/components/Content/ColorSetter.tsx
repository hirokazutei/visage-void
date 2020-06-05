import React, { CSSProperties } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SketchPicker } from "react-color";
import { Label } from "../atom/Text";
import symbol from "../../symbol";
import { ColorSetting } from "../../types";

type StyleKey = "padFixSetting";

const styles: Record<StyleKey, CSSProperties> = {
  padFixSetting: {
    // react-color does not use "border-box: initial" yet sets a padding, so if
    // we set the width to 100% without padding the container, it will go
    // outside the bounds of its container.
    paddingRight: 20,
  },
};

type Props = {
  color: ColorSetting;
  setColor: (color: ColorSetting) => void;
};
type ShortColor = {
  r: number;
  g: number;
  b: number;
};

const shortToLong = ({ r, g, b }: ShortColor) => ({
  red: r,
  green: g,
  blue: b,
});

const longToShort = ({ red, green, blue }: ColorSetting) => ({
  r: red,
  g: green,
  b: blue,
});

const ColorSetter = ({ color, setColor }: Props) => {
  return (
    <ExpansionPanel style={{ backgroundColor: symbol.COLOR.expansion }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
        <div
          style={{
            backgroundColor: `rgb(${color.red},${color.green},${color.blue})`,
            borderRadius: 80,
            width: 24,
            height: 24,
            marginRight: 12,
          }}
        />
        <Label>CHANGE COLOR</Label>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={styles.padFixSetting}>
          <SketchPicker
            width="100%"
            color={longToShort(color)}
            onChange={(color) => setColor(shortToLong(color.rgb))}
            disableAlpha={true}
          />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ColorSetter;
