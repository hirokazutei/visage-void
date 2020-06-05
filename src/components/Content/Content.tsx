import React, { CSSProperties, useContext } from "react";
import Dropzone from "./Dropzone";
import ImageDisplay from "./ImageDisplay";
import Context from "../../context";
import { Body } from "../atom/Text";
import ActionSection from "./ActionSection";
import Space from "../atom/Space";
import symbol from "../../symbol";

const styles: {
  mainContainer: CSSProperties;
  topContentContainer: CSSProperties;
  imageDisplayContainer: CSSProperties;
  leftContainer: CSSProperties;
} = {
  mainContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 24,
    width: "100%",
    flex: 1,
    alignSelf: "center",
    maxWidth: 840,
  },
  topContentContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageDisplayContainer: {
    margin: 10,
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
    <div style={styles.mainContainer}>
      <div style={styles.topContentContainer}>
        <div style={styles.leftContainer}>
          <Space.Stack size="large" />
          <Body>
            Upload a photo and keep identities of those in the picture hidden.
            VISAGE VOID detects faces and draws over the pixels with 100%
            opacity. The picture is not uploaded onto any server and all the
            processing is done on the client.
          </Body>
          <Space.Stack size="large" />
          <Dropzone />
          <Space.Stack size="huge" />
        </div>
        <ActionSection />
      </div>
      <div style={styles.imageDisplayContainer}>
        <ImageDisplay context={context} setContext={setContext} />
      </div>
    </div>
  );
};

export default Content;
