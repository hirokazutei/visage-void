import React, { CSSProperties } from "react";
import { Button, Checkbox } from "@material-ui/core";
import { Label, SubTitle } from "../../atom/Text";
import Space from "../../atom/Space";
import symbol from "../../../symbol";
import { Detection } from "../../../types";
import { PageMarker } from "../../atom/Paper";
import { useStore } from "../../../store";

type StyleKey =
  | "baseView"
  | "detectionPageMarkerContent"
  | "showToggleContainer"
  | "buttonContainer";

const styles: Record<StyleKey, CSSProperties> = {
  baseView: {
    display: "flex",
    flexDirection: "column",
    height: 190,
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

const DetectionView = () => {
  const { state, actions } = useStore();
  const { detections, editingIndex } = state;

  const showHideDetection = (index) => {
    if (detections && detections[index]) {
      detections[index].hide = !detections[index].hide;
      actions.setDetections({ detections });
    }
  };

  const onSelectedToEdit = (index) => {
    if (index === editingIndex) {
      actions.defocusDetection();
    } else if (detections && detections[index]) {
      actions.focusDetection({ index });
    }
  };

  if (!detections || editingIndex !== undefined) {
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
                    ...(editingIndex === index
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
                        onClick={() => actions.deleteDetection({ index })}
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
