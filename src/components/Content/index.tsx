import React, { CSSProperties, useContext } from "react";
import Dropzone from "./Dropzone";
import ImageDisplay from "./ImageDisplay";
import Context from "../../context";
import { Body } from "../atom/Text";
import ActionSection from "./ActionSection";
import Space from "../atom/Space";
import symbol from "../../symbol";
import { messages } from "../../strings";

type StyleKey = "mainContainer" | "topContentContainer" | "leftContainer";

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
  leftContainer: {
    maxWidth: 400,
    marginRight: symbol.SPACE.huge,
    marginLeft: symbol.SPACE.huge,
  },
};

const Content = () => {
  const { context, setContext } = useContext(Context);
  return (
    <Space.Inset all="huge" style={styles.mainContainer}>
      <div style={styles.topContentContainer}>
        <div style={styles.leftContainer}>
          <Space.Stack size="large" />
          <Body>{messages.about}</Body>
          <Space.Stack size="large" />
          <Dropzone />
          <Space.Stack size="huge" />
        </div>
        <ActionSection />
      </div>
      <Space.Inset all="medium">
        <ImageDisplay context={context} setContext={setContext} />
      </Space.Inset>
    </Space.Inset>
  );
};

export default Content;
