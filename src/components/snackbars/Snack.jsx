import React from "react";
import { Alert, Snackbar } from "@mui/material";

function Snack(props) {
  const { open, setOpen, type, message } = props;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Snack;
