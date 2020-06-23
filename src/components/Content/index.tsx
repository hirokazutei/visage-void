import React, { CSSProperties } from "react";
import LeftPane from "./LeftPane";
import ImageDisplay from "./ImageDisplay";
import ActionSection from "./ActionSection";
import Space from "../atom/Space";
import { useStore } from "../../store";
import { BrowserView, MobileView } from "react-device-detect";

type StyleKey = "mainContainer" | "topContentContainer";

const styles: Record<StyleKey, CSSProperties> = {
  mainContainer: {
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    maxWidth: 960,
    width: "100%",
  },
  topContentContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

const Content = () => {
  const { state, actions } = useStore();
  return (
    <div>
      <MobileView>
        <div className="container">
          <Space.Inset horizontal="large" bottom="huge">
            <LeftPane />
          </Space.Inset>
          <Space.Inset horizontal="large">
            <ActionSection />
          </Space.Inset>
        </div>
        <Space.Inset all="medium">
          <ImageDisplay state={state} actions={actions} />
        </Space.Inset>
      </MobileView>

      <BrowserView>
        <Space.Inset all="huge" style={styles.mainContainer}>
          <div style={styles.topContentContainer}>
            <Space.Inset horizontal="large" bottom="huge">
              <LeftPane />
            </Space.Inset>
            <Space.Inset horizontal="large">
              <ActionSection />
            </Space.Inset>
          </div>
          <Space.Inset all="medium">
            <ImageDisplay state={state} actions={actions} />
          </Space.Inset>
        </Space.Inset>
      </BrowserView>
    </div>
  );
};

export default Content;
