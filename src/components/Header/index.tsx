/* @flow */
import React, { CSSProperties, useContext } from "react";
import symbol from "../../symbol";
import SettingContext from "../../context";
import { Button } from "../atom/Button";
import Space from "../atom/Space";
import { Title } from "../atom/Text";
import stateChagne from "../../functionalty/stateChange";
import Divider from "../atom/Divider";

type StyleKey = "header" | "titleContainer" | "buttonContainer";

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
  titleContainer: { flex: 1 },
  buttonContainer: {
    flexDirection: "row",
    display: "flex",
  },
};

const Header = () => {
  const { context, setContext } = useContext(SettingContext);
  const showInfoModal = () => {
    stateChagne.showInfoModal({ context, setContext });
  };
  const showDonateModal = () => {
    stateChagne.showDonateModal({ context, setContext });
  };
  const showContactModal = () => {
    stateChagne.showContactModal({ context, setContext });
  };
  return (
    <Space.Inset style={styles.header} vertical="medium" horizontal="large">
      <div style={styles.titleContainer}>
        <Title>VISAGE VOID</Title>
      </div>
      <div style={styles.buttonContainer}>
        <Button onClick={showInfoModal}>ABOUT</Button>
        <Space.Queue size="small" />
        <Divider.Vertical color="buttonText" />
        <Space.Queue size="small" />
        <Button onClick={showContactModal}>CONTACT</Button>
        <Space.Queue size="small" />
        <Divider.Vertical color="buttonText" />
        <Space.Queue size="small" />
        <Button onClick={showDonateModal}>DONATE</Button>
      </div>
    </Space.Inset>
  );
};

export default Header;
