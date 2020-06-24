import React, { CSSProperties } from "react";
import { Link } from "@material-ui/core";
import { SubTitle, Body, Label } from "../../atom/Text";
import { Paper } from "../../atom/Paper";
import Space from "../../atom/Space";
import { useStore } from "../../../store";

type StyleKey = "modalContainer" | "contentContainer";

const styles: Record<StyleKey, CSSProperties> = {
  modalContainer: {
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  contentContainer: {
    maxWidth: 600,
    margin: 24,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    zIndex: 200,
  },
};

const DonateModal = () => {
  const { state, actions } = useStore();
  const closeModal = (e) => {
    e.stopPropagation();
    actions.hideDonateModal();
  };
  if (!state.modals.showDonateModal) {
    return null;
  }
  return (
    <div style={styles.modalContainer} onClick={closeModal}>
      <Space.Inset all="large">
        <div onClick={(e) => e.stopPropagation()}>
          <Paper>
            <SubTitle>Please Donate!</SubTitle>
            <Space.Stack size="medium" />
            <Body>People in the US are Fighting Against Opression!</Body>
            <Body>If you are able to, please donate to support their cause.</Body>
            <Space.Stack size="small" />
            <Label>
              <Link href="http://northstarhealthcollective.org/donate">・ Northstar Health Collective</Link>
            </Label>
            <Label>
              <Link href="http://secure.everyaction.com/zae4prEeKESHBy0MKXTIcQ2">・ Reclaim the Block</Link>
            </Label>
            <Label>
              <Link href="http://secure.everyaction.com/4omQDAR0oUiUagTu0EG-Ig2">・ Black Visions Collective</Link>
            </Label>
            <Label>
              <Link href="https://minnesotafreedomfund.org">・ Minnesota Freedom Fund</Link>
            </Label>
          </Paper>
        </div>
      </Space.Inset>
    </div>
  );
};

export default DonateModal;
