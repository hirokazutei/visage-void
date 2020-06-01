import React, { CSSProperties } from "react";
import Header from "./Header/index";
import Body from "./Body/index";

const styles: { mainContent: CSSProperties } = {
  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
};

const Page = () => {
  return (
    <div style={styles.mainContent}>
      <Header />
      <Body />
    </div>
  );
};

export default Page;
