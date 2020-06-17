import React, { useContext, CSSProperties } from "react";
import { Link } from "@material-ui/core";
import {
  Face as FaceIcon,
  LocationOff as LocationOffIcon,
  Build as BuildIcon,
  CloudOff as CloudOffIcon,
} from "@material-ui/icons";
import SettingContext from "../../context";
import { SubTitle, Body, Label } from "../atom/Text";
import { Paper } from "../atom/Paper";
import Space from "../atom/Space";
import stateChange from "../../functionalty/stateChange";

type StyleKey = "modalContainer" | "contentContainer" | "iconText";

const styles: Record<StyleKey, CSSProperties> = {
  modalContainer: {
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  contentContainer: {
    maxWidth: 500,
    margin: 24,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    zIndex: 200,
  },
  iconText: {
    display: "flex",
    flexDirection: "row",
  },
};

const InfoModal = () => {
  const { context, setContext } = useContext(SettingContext);
  const closeModal = (e) => {
    e.stopPropagation();
    stateChange.hideInfoModal({ context, setContext });
  };
  if (!context.showInfoModal) {
    return null;
  }
  return (
    <div style={styles.modalContainer} onClick={closeModal}>
      <Space.Inset all="large">
        <div onClick={(e) => e.stopPropagation()}>
          <Paper>
            <SubTitle>About Visage Void</SubTitle>
            <Space.Stack size="medium" />
            <div style={styles.iconText}>
              <FaceIcon color="secondary" />
              <Space.Queue size="small" />
              <Label>Detects and Obscures Face</Label>
            </div>
            <Space.Inset horizontal="medium" vertical="small">
              <Body>
                Visage Void uses
                <Link href="https://github.com/justadudewhohacks/face-api.js/">
                  {" face-api.js "}
                </Link>
                to detect faces in pictures and covers it up with a 100% opacity
                mask.
              </Body>
            </Space.Inset>
            <Space.Stack size="small" />
            <div style={styles.iconText}>
              <LocationOffIcon color="secondary" />
              <Space.Queue size="small" />
              <Label>Scrubs The Photo's Metadata</Label>
            </div>
            <Space.Inset horizontal="medium" vertical="small">
              <Body>
                The app uses
                <Link href="https://p5js.org/">{" p5.js "}</Link>
                to redraw the picture onto an html canvas so the new image
                created has no metadata of the previous picture.
              </Body>
            </Space.Inset>
            <Space.Stack size="small" />
            <div style={styles.iconText}>
              <BuildIcon color="secondary" />
              <Space.Queue size="small" />
              <Label>Manually Cover and Adjust</Label>
            </div>
            <Space.Inset horizontal="medium" vertical="small">
              <Body>
                You can add or delete masks in the "Manual" tab once the image
                is loaded.
              </Body>
              <Body>
                You can also adjust their position, size or color. More features
                will be introduced in the near future.
              </Body>
            </Space.Inset>
            <Space.Stack size="small" />
            <div style={styles.iconText}>
              <CloudOffIcon color="secondary" />
              <Space.Queue size="small" />
              <Label>Nothing Leaves the Browser</Label>
            </div>
            <Space.Inset horizontal="medium" vertical="small">
              <Body>
                Everything happens in your browser and no data leaves the
                browser!
              </Body>
              <Body>
                You or someone who you know who understand code can adit the
                code at this
                <Link href="https://github.com/hirokazutei/visage-void">
                  {" GitHub repository."}
                </Link>
              </Body>
            </Space.Inset>
            <Space.Stack size="small" />
          </Paper>
        </div>
      </Space.Inset>
    </div>
  );
};

export default InfoModal;
