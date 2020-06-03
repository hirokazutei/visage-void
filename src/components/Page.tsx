import React, { CSSProperties, useContext } from "react";
import Context from "../context";
import { Snackbar, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons/";

import Header from "./Header/index";
import Content from "./Content/Content";
import DonateModal from "./Modal/DonateModal";

const styles: { mainContent: CSSProperties } = {
  mainContent: { flex: 1, display: "flex", flexDirection: "column" },
};

const Page = () => {
  const { context, setContext } = useContext(Context);
  const { snackBarMessage } = context;

  const handleClose = () => {
    setContext({
      ...context,
      snackBarMessage: "",
      editCount: context.editCount + 1,
    });
  };

  return (
    <div style={styles.mainContent}>
      <Header />
      <Content />
      <DonateModal />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={!!snackBarMessage}
        autoHideDuration={10000}
        onClose={handleClose}
        action={
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert severity="info">{snackBarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default Page;
