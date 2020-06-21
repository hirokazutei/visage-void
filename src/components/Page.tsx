import React, { CSSProperties, useEffect, useCallback } from "react";
import Header from "./Header";
import Content from "./Content";
import DonateModal from "./Modals/DonateModal";
import Snackbar from "./SnackBar";
import InfoModal from "./Modals/InfoModal";
import ContactModal from "./Modals/ContactModal";
import { useStore } from "../store";

type StyleKey = "mainContent";

const styles: Record<StyleKey, CSSProperties> = {
  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
};

const Page = () => {
  const { state, actions } = useStore();
  const { imageInfo } = state;
  const { width, height } = imageInfo;
  const handleResize = useCallback(() => {
    if (width && height) {
      const maxRatio = (() => {
        const widthRatio = Math.ceil(width / window.innerWidth);
        const heightRatio = Math.ceil(height / window.innerHeight);
        return Math.max(widthRatio, heightRatio, 1);
      })();
      const currentRatio =
        maxRatio > imageInfo.currentRatio ? maxRatio : imageInfo.currentRatio;
      actions.resize({ maxRatio, currentRatio });
    }
  }, [height, imageInfo, width, actions]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div style={styles.mainContent}>
      <Header />
      <Content />
      <ContactModal />
      <DonateModal />
      <InfoModal />
      <Snackbar />
    </div>
  );
};

export default Page;
