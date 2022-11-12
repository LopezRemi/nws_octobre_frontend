import "./App.css";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Top from "./components/header/Top";

function App() {

  return (
    <>
      <Top backButton={false} />
      <Typography
        variant="h2"
        align="center"
        sx={{ marginTop: "50px", marginBottom: "20px" }}
      >
        Bienvenue
      </Typography>
      <Grid
        container
        direction="column"
        alignContent="center"
        justifyContent="space-around"
        sx={{ marginTop: "4%" }}
      >
      </Grid>
    </>
  );
}

export default App;
