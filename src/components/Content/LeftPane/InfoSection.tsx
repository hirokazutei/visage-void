import React, { CSSProperties, useContext } from "react";
import {
  Face as FaceIcon,
  LocationOff as LocationOffIcon,
  Build as BuildIcon,
  CloudOff as CloudOffIcon,
  Info as InfoIcon,
} from "@material-ui/icons";
import SettingContext from "../../../context";
import { Label } from "../../atom/Text";
import Space from "../../atom/Space";
import { Paper } from "../../atom/Paper";
import stateChange from "../../../functionalty/stateChange";
import { Tooltip } from "@material-ui/core";

type StyleKey = "iconText" | "infoContainer";

const styles: Record<StyleKey, CSSProperties> = {
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

const InfoSection = () => {
  const { context, setContext } = useContext(SettingContext);
  return (
    <Paper>
      <div style={styles.infoContainer}>
        <div>
          <div style={styles.iconText}>
            <FaceIcon color="secondary" />
            <Space.Queue size="small" />
            <Label>Detects and Obscures Face</Label>
          </div>
          <Space.Stack size="small" />
          <div style={styles.iconText}>
            <LocationOffIcon color="secondary" />
            <Space.Queue size="small" />
            <Label>Scrubs The Photo's Metadata</Label>
          </div>
          <Space.Stack size="small" />
          <div style={styles.iconText}>
            <BuildIcon color="secondary" />
            <Space.Queue size="small" />
            <Label>Manually Cover and Adjust</Label>
          </div>
          <Space.Stack size="small" />
          <div style={styles.iconText}>
            <CloudOffIcon color="secondary" />
            <Space.Queue size="small" />
            <Label>Nothing Leaves the Browser</Label>
          </div>
        </div>
        <Tooltip title="More Info">
          <InfoIcon
            color="secondary"
            onClick={() => stateChange.showInfoModal({ context, setContext })}
          />
        </Tooltip>
      </div>
    </Paper>
  );
};

export default InfoSection;
