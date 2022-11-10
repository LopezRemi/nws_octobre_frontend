import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h1" align="center" sx={{ marginTop: "20%" }}>
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h2" align="center">
          Page non trouvée
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => navigate("/")}>
          Accueil
        </Button>
      </Grid>
    </Grid>
  );
}

export default NotFound;
