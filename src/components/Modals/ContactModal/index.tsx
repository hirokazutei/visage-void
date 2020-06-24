import React, { CSSProperties } from "react";
import { Tooltip } from "@material-ui/core";
import { GitHub as GitHubIcon, LinkedIn as LinkedInIcon, Twitter as TwitterIcon } from "@material-ui/icons";
import { SubTitle } from "../../atom/Text";
import { Paper } from "../../atom/Paper";
import Space from "../../atom/Space";
import { useStore } from "../../../store";

type StyleKey = "modalContainer" | "paper" | "titleContainer" | "verticalExpander" | "iconsContainer";

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
  paper: {
    maxWidth: 600,
    minWidth: 300,
    minHeight: 150,
    display: "flex",
    flexDirection: "column",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
  },
  verticalExpander: {
    display: "flex",
    flex: 1,
    flexBasis: "column",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
};

const ContactModal = () => {
  const { state, actions } = useStore();
  const closeModal = (e) => {
    e.stopPropagation();
    actions.hideContactModal();
  };
  if (!state.modals.showContactModal) {
    return null;
  }
  return (
    <div style={styles.modalContainer} onClick={closeModal}>
      <Space.Inset all="large">
        <div onClick={(e) => e.stopPropagation()}>
          <Paper customStyle={styles.paper}>
            <Space.Inset all="small" style={styles.titleContainer}>
              <SubTitle>How To Contact Me:</SubTitle>
            </Space.Inset>
            <div style={styles.verticalExpander}>
              <Space.Inset all="large" style={styles.iconsContainer}>
                <a href="https://twitter.com/aSublimeAddict" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="Twitter">
                    <TwitterIcon color="secondary" fontSize="large" />
                  </Tooltip>
                </a>
                <Space.Queue size="large" />
                <a href="https://www.linkedin.com/in/hirokazutei" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="LinkedIn">
                    <LinkedInIcon color="secondary" fontSize="large" />
                  </Tooltip>
                </a>
                <Space.Queue size="large" />
                <a href="https://github.com/hirokazutei/visage-void" target="_blank" rel="noopener noreferrer">
                  <Tooltip title="GitHub">
                    <GitHubIcon color="secondary" fontSize="large" />
                  </Tooltip>
                </a>
              </Space.Inset>
            </div>
          </Paper>
        </div>
      </Space.Inset>
    </div>
  );
};

export default ContactModal;
