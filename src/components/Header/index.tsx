/* @flow */
import React, { CSSProperties } from "react";
import { isMobile } from "react-device-detect";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons/";
import symbol from "../../symbol";
import { Button } from "../atom/Button";
import Space from "../atom/Space";
import { Title } from "../atom/Text";
import Divider from "../atom/Divider";
import { useStore } from "../../store";

type StyleKey = "banner" | "header" | "titleContainer" | "buttonContainer" | "menuItem" | "menu";

const styles: Record<StyleKey, CSSProperties> = {
  banner: { width: "100%", boxSizing: "border-box" },
  header: {
    alignContent: "flex-end",
    justifyContent: "space-between",
    backgroundColor: symbol.COLOR.background,
    boxShadow: `0px 0px 10px ${symbol.COLOR.backgroundOffset}`,
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
  menuItem: {
    backgroundColor: symbol.COLOR.cards,
    color: symbol.COLOR.text,
  },
  menu: {
    backgroundColor: symbol.COLOR.cards,
  },
};

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const { actions } = useStore();
  const showInfoModal = () => {
    actions.showInfoModal();
    closeMenu();
  };
  const showDonateModal = () => {
    actions.showDonateModal();
    closeMenu();
  };
  const showContactModal = () => {
    actions.showContactModal();
    closeMenu();
  };
  return (
    <div style={styles.banner}>
      <Space.Inset style={styles.header} vertical="medium" horizontal="large">
        <div style={styles.titleContainer}>
          <Title>VISAGE VOID</Title>
        </div>
        {!isMobile ? (
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
        ) : (
          <>
            <IconButton size="small" onClick={openMenu}>
              <MenuIcon fontSize="large" color="secondary" />
            </IconButton>
            <Menu MenuListProps={{ style: styles.menu }} anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
              <MenuItem style={styles.menuItem} onClick={showInfoModal}>
                ABOUT
              </MenuItem>
              <MenuItem style={styles.menuItem} onClick={showContactModal}>
                CONTACT
              </MenuItem>
              <MenuItem style={styles.menuItem} onClick={showDonateModal}>
                DONATE
              </MenuItem>
            </Menu>
          </>
        )}
      </Space.Inset>
    </div>
  );
};

export default Header;
