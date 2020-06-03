import React, { CSSProperties } from "react";
import { Button, Checkbox } from "@material-ui/core";
import { Label, SubTitle } from "../atom/Text";
import Space from "../atom/Space";
import symbol from "../../symbol";
import { Detections, Detection } from "../../types";
import { PageMarker } from "../atom/Paper";

const styles: {
  baseView: CSSProperties;
  detectionPageMarkerContent: CSSProperties;
  showToggleContainer: CSSProperties;
  buttonContainer: CSSProperties;
} = {
  baseView: {
    display: "flex",
    flexDirection: "column",
    height: 250,
    overflow: "scroll",
    boxShadow: "inset 0 0 15px #000000",
    padding: symbol.SPACE.small,
  },
  detectionPageMarkerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  showToggleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};

type Props = {
  detections?: Detections;
  selectedIndex?: number;
  showHideDetection: (index: number) => void;
  onSelectedToEdit: (index: number) => void;
  removeDetection: (index: number) => void;
};

const DetectionView = ({
  detections,
  selectedIndex,
  showHideDetection,
  onSelectedToEdit,
  removeDetection,
}: Props) => {
  if (!detections || selectedIndex !== undefined) {
    return null;
  }
  return (
    <>
      <SubTitle>{`${detections.length} MASKS`}</SubTitle>
      <Space.Stack size="small" />
      <div style={styles.baseView}>
        {detections &&
          detections.map((detection: Detection, index: number) => {
            return (
              <div key={index}>
                <PageMarker
                  customStyle={{
                    ...(selectedIndex === index
                      ? { backgroundColor: symbol.COLOR.button }
                      : {}),
                  }}
                >
                  <div style={styles.detectionPageMarkerContent}>
                    <div style={styles.showToggleContainer}>
                      <Label>SHOW:</Label>
                      <Checkbox
                        checked={!detection.hide}
                        onChange={() => showHideDetection(index)}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </div>
                    <div style={styles.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onSelectedToEdit(index)}
                      >
                        EDIT
                      </Button>
                      <Space.Queue size="small" />
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: symbol.COLOR.error,
                          color: symbol.COLOR.white,
                        }}
                        onClick={() => removeDetection(index)}
                      >
                        REMOVE
                      </Button>
                    </div>
                  </div>
                </PageMarker>
                <Space.Stack size="small" />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DetectionView;
