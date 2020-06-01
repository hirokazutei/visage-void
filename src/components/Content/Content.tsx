import React, { CSSProperties, useContext } from "react";
import Dropzone from "./Dropzone";
import ImageDisplay from "./ImageDisplay";
import Context from "../../context";
import Setting from "./Setting";
import { Body } from "../atom/Text";

const styles: {
  mainContainer: CSSProperties;
  topContentContainer: CSSProperties;
  imageDisplayContainer: CSSProperties;
  textContainer: CSSProperties;
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
    maxWidth: 640,
  },
  topContentContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  imageDisplayContainer: {
    margin: 10,
  },
  textContainer: {
    padding: 24,
  },
};

const Content = () => {
  const { context, setContext } = useContext(Context);
  return (
    <div style={styles.mainContainer}>
      <div style={styles.topContentContainer}>
        <div>
          <div style={styles.textContainer}>
            <Body>
              Upload a photo and keep identities of those in the picture hidden.
              VISAGE VOID detects faces and draws over the pixels with 100%
              opacity. The picture is not uploaded onto any server and all the
              processing is done on the client.
            </Body>
          </div>
          <Dropzone />
        </div>
        <Setting />
      </div>
      <div style={styles.imageDisplayContainer}>
        <ImageDisplay context={context} setContext={setContext} />
      </div>
    </div>
  );
};

export default Content;
