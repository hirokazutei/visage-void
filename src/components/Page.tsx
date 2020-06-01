import React, { CSSProperties } from "react";
import Header from "./Header/index";
import Content from "./Content/Content";
import DonateModal from "./Modal/DonateModal";

const styles: { mainContent: CSSProperties } = {
  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
};

const Page = () => {
  return (
    <div style={styles.mainContent}>
      <Header />
      <Content />
      <DonateModal />
    </div>
  );
};

export default Page;
