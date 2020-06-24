import React, { useState, useMemo } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Label } from "../../atom/Text";
import symbol from "../../../symbol";
import "emoji-mart/css/emoji-mart.css";
import { emojiIndex } from "emoji-mart";
import { useStore } from "../../../store";
import { ContainedButton } from "../../atom/Button";
import { FACE_EMOJIS } from "../../../const";
import Space from "../../atom/Space";

const EmojiRandomizer = () => {
  const { state, actions } = useStore();
  const [emojiFaceChecked, setEmojiFaceChecked] = useState<boolean>(false);
  const allEmojis = useMemo(() => {
    return Object.keys(emojiIndex.emojis).map((key) => {
      return emojiIndex.emojis[key].native;
    });
  }, []);
  const emojis = useMemo(() => {
    return emojiFaceChecked ? FACE_EMOJIS : allEmojis;
  }, [emojiFaceChecked, allEmojis]);

  const randomizeEmojis = () => {
    const { detections } = state;
    if (detections) {
      for (const detection of detections) {
        detection.emojiChar = emojis[Math.floor(Math.random() * emojis.length)];
      }
      actions.setDetections({ detections });
    }
  };

  return (
    <ExpansionPanel style={{ backgroundColor: symbol.COLOR.expansion }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
        <Label>EMOJI RANDOMIZER</Label>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: symbol.COLOR.text }}
                color="secondary"
                checked={emojiFaceChecked}
                onChange={() => setEmojiFaceChecked(!emojiFaceChecked)}
              />
            }
            label={<Label>Face Emojis Only</Label>}
          />
          <Space.Stack size="medium" />
          <ContainedButton onClick={() => randomizeEmojis()}>RANDOMIZE EMOJIS</ContainedButton>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default EmojiRandomizer;

/**
 * categories: {
  search: 'Search Results',
  recent: 'Frequently Used',
  smileys: 'Smileys & Emotion',
  people: 'People & Body',
  nature: 'Animals & Nature',
  foods: 'Food & Drink',
  activity: 'Activity',
  places: 'Travel & Places',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
  custom: 'Custom',
},
 */
