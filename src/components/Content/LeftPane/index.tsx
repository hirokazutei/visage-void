import React, { CSSProperties } from "react";
import Space from "../../atom/Space";
import DetectionTuning from "./DetectionTuning";
import Dropzone from "./Dropzone";
import InfoSection from "./InfoSection";

type StyleKey = "leftContainer";

const styles: Record<StyleKey, CSSProperties> = {
  leftContainer: {
    maxWidth: 400,
  },
};

const LeftPane = () => {
  return (
    <div style={styles.leftContainer}>
      <InfoSection />
      <Space.Stack size="large" />
      <Dropzone />
      <Space.Stack size="large" />
      <DetectionTuning />
    </div>
  );
};

export default LeftPane;
