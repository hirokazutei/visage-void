/* @flow */
import React, { CSSProperties, useContext } from "react";
import symbol from "../../symbol";
import SettingContext from "../../context";
import { Button } from "../atom/Button";
import Space from "../atom/Space";
import { Title } from "../atom/Text";
import stateChagne from "../../functionalty/stateChange";

type StyleKey = "header";

const styles: Record<StyleKey, CSSProperties> = {
  header: {
    alignContent: "flex-end",
    justifyContent: "space-between",
    backgroundColor: symbol.COLOR.background,
    boxShadow: `0px 0px 20px ${symbol.COLOR.backgroundOffset}`,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    maxHeight: 35,
  },
};

const Header = () => {
  const { context, setContext } = useContext(SettingContext);
  const showModal = () => {
    stateChagne.showDonateModal({ context, setContext });
  };
  return (
    <Space.Inset style={styles.header} vertical="medium" horizontal="large">
      <Title>VISAGE VOID</Title>
      <Button onClick={showModal}>DONATE</Button>
    </Space.Inset>
  );
};

export default Header;
