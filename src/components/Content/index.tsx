import React, { CSSProperties, useContext } from "react";
import LeftPane from "./LeftPane";
import ImageDisplay from "./ImageDisplay";
import Context from "../../context";
import ActionSection from "./ActionSection";
import Space from "../atom/Space";

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
  const { context, setContext } = useContext(Context);
  return (
    <Space.Inset all="huge" style={styles.mainContainer}>
      <div style={styles.topContentContainer}>
        <LeftPane />
        <ActionSection />
      </div>
      <Space.Inset all="medium">
        <ImageDisplay context={context} setContext={setContext} />
      </Space.Inset>
    </Space.Inset>
  );
};

export default Content;
