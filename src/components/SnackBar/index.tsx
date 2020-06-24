import React from "react";
import { Snackbar as MUISnackBar, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Close as CloseIcon } from "@material-ui/icons/";
import { useStore } from "../../store";

const MESSAGE_AUTOHIDE_DURATION = 10000;

const Snackbar = () => {
  const { state, actions } = useStore();
  const { snackBarMessage } = state;
  const closeSnackBar = () => {
    actions.closeSnackBar();
  };

  return (
    <MUISnackBar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={!!snackBarMessage}   autoHideDuration={MESSAGE_AUTOHIDE_DURATION}
      onClose={closeSnackBar}
      action={
        <IconButton size="small" onClick={closeSnackBar}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert severity="info">{snackBarMessage}</Alert>
    </MUISnackBar>
  );
};

export default Snackbar;
