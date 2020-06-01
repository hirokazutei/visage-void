import React, { CSSProperties, useContext } from "react";
import Dropzone from "./Dropzone";
import ImageDisplay from "./ImageDisplay";
import Context from "../../context";
import Setting from "./Setting";

const styles: {
  mainContainer: CSSProperties;
  topContentContainer: CSSProperties;
  imageDisplayContainer: CSSProperties;
} = {
  mainContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 20,
    width: "100%",
    flex: 1,
  },
  topContentContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  imageDisplayContainer: {
    margin: 10,
  },
};

const Body = () => {
  const { context, setContext } = useContext(Context);
  return (
    <div style={styles.mainContainer}>
      <div style={styles.topContentContainer}>
        <Dropzone />
        <Setting />
      </div>
      <div style={styles.imageDisplayContainer}>
        <ImageDisplay context={context} setContext={setContext} />
      </div>
    </div>
  );
};

export default Body;
