import React from "react";
import { Button } from "@material-ui/core";
import symbol from "../../../symbol";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import DetectionView from "./DetectionsView";
import EditView from "./EditView";
import { useStore } from "../../../store";

const Manual = () => {
  const { state, actions } = useStore();
  const { imageInfo, editingIndex } = state;

  const addNew = () => {
    actions.addDetection();
  };

  return (
    <>
      <Space.Stack size="medium" />
      <EditView />
      <DetectionView />
      {!!imageInfo.src && editingIndex === undefined && (
        <>
          <Space.Stack size="medium" />
          <Button
            style={{ backgroundColor: symbol.COLOR.button }}
            variant="contained"
            onClick={addNew}
          >
            <Label>ADD NEW</Label>
          </Button>
        </>
      )}
    </>
  );
};

export default Manual;
