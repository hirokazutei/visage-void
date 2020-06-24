import React, { CSSProperties } from "react";
import { Slider, Button, ClickAwayListener, Tooltip } from "@material-ui/core";
import { Info as InfoIcon } from "@material-ui/icons";
import symbol from "../../../symbol";
import { Body, SubTitle } from "../../atom/Text";
import Space from "../../atom/Space";
import { ContainedButton } from "../../atom/Button";
import { getFullFaceDescription } from "../../../face-api/face";
import { Paper } from "../../atom/Paper";
import { useStore } from "../../../store";

type StyleKey = "rescanButtons";

const styles: Record<StyleKey, CSSProperties> = {
  rescanButtons: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
};

const DetectionTuning = () => {
  const { state, actions } = useStore();
  const { imageInfo, inputSize } = state;
  const [open, setOpen] = React.useState(false);

  const rescan = async () => {
    await getFullFaceDescription(imageInfo.src, inputSize).then((fullDescription) => {
      if (!!fullDescription) {
        actions.updateDetections({
          fullDescription,
        });
      }
    });
  };

  const overlapScan = async () => {
    await getFullFaceDescription(imageInfo.src, inputSize).then((fullDescription) => {
      if (!!fullDescription) {
        actions.appendDetections({
          fullDescription,
        });
      }
    });
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button onClick={handleClick}>
            <SubTitle>Detection Tuning</SubTitle>
            <Space.Queue size="small" />
            <Tooltip title="More Info">
              <InfoIcon color="secondary" fontSize="small" />
            </Tooltip>
          </Button>
          {open ? (
            <Paper customStyle={{ padding: symbol.SPACE.medium }}>
              <Body>
                If the facial detection is not accurate, you can rescan or overlap with previous scans. The higher the
                value, the more precise the detections are, but slower.
              </Body>
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>

      <Slider
        value={inputSize}
        step={32}
        onChange={(_, newValue) => {
          actions.updateInputSize({
            inputSize: Array.isArray(newValue) ? newValue[0] : newValue,
          });
        }}
        min={32}
        max={2048}
        valueLabelDisplay="auto"
      />
      <Space.Stack size="medium" />
      {imageInfo.src && (
        <div style={styles.rescanButtons}>
          <ContainedButton onClick={rescan}>REDO SCANS</ContainedButton>
          <Space.Queue size="huge" />
          <ContainedButton onClick={overlapScan}>OVERLAP NEW SCANS</ContainedButton>
        </div>
      )}
    </>
  );
};

export default DetectionTuning;
