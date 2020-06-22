import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Label } from "../../atom/Text";
import symbol from "../../../symbol";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import Space from "../../atom/Space";

const EmojiSelecter = ({
  emoji,
  setEmoji,
  title,
}: {
  emoji: string;
  setEmoji: (arg: string) => void;
  title: string;
}) => {
  return (
    <ExpansionPanel style={{ backgroundColor: symbol.COLOR.expansion }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
        <Label>{emoji}</Label>
        <Space.Queue size="small" />
        <Label>{title}</Label>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Picker
          theme="dark"
          sheetSize={32}
          emojiSize={18}
          emojiTooltip={true}
          onSelect={(event) => setEmoji(event.native)}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default EmojiSelecter;
