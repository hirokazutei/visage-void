/* @flow */
import React, { CSSProperties, useContext } from "react";
import symbol from "../../symbol";
import SettingContext from "../../context";
import { Button } from "../atom/Button";

const styles: { header: CSSProperties; title: CSSProperties } = {
  header: {
    alignContent: "flex-end",
    justifyContent: "space-between",
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
  const { context, setContext } = useContext(SettingContext);
  const showDialog = () => {
    setContext({
      ...context,
      showDialog: true,
      editCount: context.editCount + 1,
    });
  };
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>VISAGE VOID</h1>
      <Button onClick={showDialog}>DONATE</Button>
    </div>
  );
};

export default Header;
