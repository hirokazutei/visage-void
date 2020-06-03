import React, { CSSProperties } from "react";
import {
  Slider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Label } from "../atom/Text";
import Space from "../atom/Space";
import symbol from "../../symbol";
import { ColorSetting } from "../../types";

const styles: {
  colorSliderContianer: CSSProperties;
  colorSetting: CSSProperties;
} = {
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

type Props = {
  color: ColorSetting;
  setColor: (color) => any;
};

const ColorSetter = ({ color, setColor }: Props) => {
  const colorSliders = [
    {
      text: "R",
      value: color.red,
      setter: (red) => setColor({ ...color, red }),
    },
    {
      text: "G",
      value: color.green,
      setter: (green) => setColor({ ...color, green }),
    },
    {
      text: "B",
      value: color.blue,
      setter: (blue) => setColor({ ...color, blue }),
    },
  ];

  return (
    <ExpansionPanel style={symbol.STYLE.contentWrapper}>
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
        <div style={styles.colorSetting}>
          {colorSliders.map((props) => {
            const { text, value, setter } = props;
            return (
              <div style={styles.colorSliderContianer} key={text}>
                <Label>{text}</Label>
                <Space.Queue size="medium" />
                <Slider
                  value={value}
                  onChange={(_, newValue) => {
                    setter(Array.isArray(newValue) ? newValue[0] : newValue);
                  }}
                  min={0}
                  max={255}
                  valueLabelDisplay="auto"
                />
              </div>
            );
          })}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default ColorSetter;
