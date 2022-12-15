import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserTable } from "../components/table";
import Top from "../components/header/Top";
import { AddModal } from "../components/modals";
import { Snack } from "../components/snackbars";

function MaterialList() {
  

  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");



  const notify = (type, message) => {
    setOpenSnack(true);
    setType(type);
    setMessage(message);
  };

  return (
    <div>
      <Top backButton={true} />
      <Typography
        variant="h2"
        align="center"
        sx={{ marginTop: "50px", marginBottom: "20px" }}
      >
        Liste du Materiel UWU
      </Typography>
      <Box textAlign="center" my="15px">
        <Button
          variant="text"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          mx={{ margin: "auto" }}
          size="large"
          disableRipple
        >
          Ajouter du materiel
        </Button>
      </Box>
      <UserTable />

      <AddModal open={open} setOpen={setOpen} notify={notify} />

      <Snack
        open={openSnack}
        setOpen={setOpenSnack}
        type={type}
        message={message}
      />
    </div>
  );
}

export default MaterialList;
