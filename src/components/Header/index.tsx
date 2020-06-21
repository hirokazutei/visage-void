/* @flow */
import React, { CSSProperties } from "react";
import symbol from "../../symbol";
import { Button } from "../atom/Button";
import Space from "../atom/Space";
import { Title } from "../atom/Text";
import Divider from "../atom/Divider";
import { useStore } from "../../store";

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
  const { actions } = useStore();
  const showInfoModal = () => {
    actions.showInfoModal();
  };
  const showDonateModal = () => {
    actions.showDonateModal();
  };
  const showContactModal = () => {
    actions.showContactModal();
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
