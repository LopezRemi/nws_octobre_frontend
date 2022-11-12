import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Top(props) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const onDisconnect = () => {
    localStorage.removeItem("fake-token");
    navigate("/");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mt: "1%", width: "95%", mx: "auto" }}
    >
      <Grid item>
      <img src='https://upload.wikimedia.org/wikipedia/commons/d/dd/Logo_nws.png' alt="" style={{ width: 250, height: 100, }}></img>
      </Grid>
      <Grid item justifyContent="flex-end">
        {localStorage.getItem("fake-token") !== null && user !== null && (
          <>
            <Button
              variant="contained"
              onClick={onDisconnect}
              sx={{ ml: "20px" }}
            >
              Se déconnecter
            </Button>
          </>
        )}
      </Grid>
    </Grid>

    // <Grid container justifyContent="space-between">
    //   <Grid
    //     container
    //     item
    //     justifyContent="flex-start"
    //     alignItems="center"
    //     // sx={{ top: "10px", left: "20px" }}
    //   >
    //     <Button
    //       variant="contained"
    //       onClick={() => navigate("/")}
    //       // sx={{ position: "absolute", top: "10px", left: "20px" }}
    //     >
    //       Retour
    //     </Button>
    //   </Grid>

    //   {localStorage.getItem("fake-token") !== null && user !== null && (
    //     <Grid
    //       container
    //       item
    //       direction="row"
    //       spacing={6}
    //       justifyContent="flex-end"
    //       alignItems="center"
    //       // sx={{ mr: "20px", flexFlow: "wrap" }}
    //     >
    //       <Grid item>
    //         <Typography variant="body">
    //           Bonjour {user.firstName} {user.lastName}
    //         </Typography>
    //       </Grid>
    //       <Grid item>
    //         <Button variant="contained" onClick={onDisconnect}>
    //           Se déconnecter
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   )}
    // </Grid>
  );
}

export default Top;
