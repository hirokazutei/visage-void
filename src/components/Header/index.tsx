/* @flow */
import React, { CSSProperties } from "react";
import symbol from "../../symbol";

const styles: { header: CSSProperties; title: CSSProperties } = {
  header: {
    alignContent: "flex-end",
    backgroundColor: symbol.COLOR.background,
    boxShadow: `0px 0px 20px ${symbol.COLOR.backgroundOffset}`,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    maxHeight: 75,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 50,
    paddingBottom: 10,
  },
  title: {
    alignSelf: "center",
    fontSize: 35,
    color: symbol.COLOR.text,
  },
};

const Header = () => {
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>VISAGE VOID</h1>
    </div>
  );
};

export default Header;
