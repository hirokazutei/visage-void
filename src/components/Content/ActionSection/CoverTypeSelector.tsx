import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { COVER_TYPE } from "../../../const";
import { CoverType } from "../../../types";

const CoverTypeSelector = ({
  coverType,
  setCoverType,
}: {
  coverType: CoverType;
  setCoverType: (type: CoverType) => void;
}) => {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      {COVER_TYPE.map((type, index) => {
        const borderRadius = (() => {
          if (index === 0) return "8px 0px 0px 8px";
          else if (index === COVER_TYPE.length - 1) {
            return "0px 8px 8px 0px";
          }
          return 0;
        })();
        return (
          <Button
            key={type}
            variant={type === coverType ? "contained" : "outlined"}
            onClick={() => setCoverType(type)}
            style={{ borderRadius }}
          >
            {type}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default CoverTypeSelector;
