import React, { CSSProperties } from "react";
import Header from "./Header";
import Content from "./Content";
import Modal from "./Modal";
import Snackbar from "./SnackBar";

type StyleKey = "mainContent";

const styles: Record<StyleKey, CSSProperties> = {
  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
};

const Page = () => {
  return (
    <div style={styles.mainContent}>
      <Header />
      <Content />
      <Modal />
      <Snackbar />
    </div>
  );
};

export default Page;
