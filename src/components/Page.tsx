import React, {
  CSSProperties,
  useEffect,
  useContext,
  useCallback,
} from "react";
import Context from "../context";
import Header from "./Header";
import Content from "./Content";
import DonateModal from "./Modals/DonateModal";
import Snackbar from "./SnackBar";
import InfoModal from "./Modals/InfoModal";

type StyleKey = "mainContent";

const styles: Record<StyleKey, CSSProperties> = {
  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
};

const Page = () => {
  const { context, setContext } = useContext(Context);
  const { imageInfo, editCount } = context;
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
      setContext({
        ...context,
        imageInfo: { ...imageInfo, currentRatio, maxRatio },
        editCount: editCount + 1,
      });
    }
  }, [height, imageInfo, setContext, width, context, editCount]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div style={styles.mainContent}>
      <Header />
      <Content />
      <DonateModal />
      <InfoModal />
      <Snackbar />
    </div>
  );
};

export default Page;
