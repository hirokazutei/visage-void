import React, { CSSProperties, useContext } from "react";
import { Button, Checkbox } from "@material-ui/core";
import { Label, SubTitle } from "../atom/Text";
import Space from "../atom/Space";
import symbol from "../../symbol";
import { Detection } from "../../types";
import { PageMarker } from "../atom/Paper";
import Context from "../../context";
import { messages } from "../../strings";
import stateChange from "../../functionalty/stateChagne";

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

const DetectionView = () => {
  const { context, setContext } = useContext(Context);
  const { detections, editingIndex } = context;

  const showHideDetection = (index) => {
    if (detections && detections[index]) {
      detections[index].hide = !detections[index].hide;
      setContext({
        ...context,
        ...detections,
        editCount: context.editCount + 1,
      });
    }
  };

  const onSelectedToEdit = (index) => {
    if (index === editingIndex) {
      setContext({
        ...context,
        editingIndex: undefined,
        editCount: context.editCount + 1,
      });
    } else if (detections && detections[index]) {
      setContext({
        ...context,
        ...(context.displaedMessages.dragToChange
          ? {}
          : {
              snackBarMessage: messages.draggable,
              displaedMessages: { dragToChange: true },
            }),
        editingIndex: index,
        editCount: context.editCount + 1,
      });
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
                        onClick={() =>
                          stateChange.deleteDetection({
                            detections,
                            index,
                            context,
                            setContext,
                          })
                        }
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
