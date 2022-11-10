import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Modal from "react-modal";
import { deleteUser } from "../../service";

function DeleteModal(props) {
  const { open, setOpen, delUser, notify } = props;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      setOpen(false);
      notify("success", "L'utilisateur a bien été supprimé");
    },
    onError: () => {
      setOpen(false);
      notify("error", "Un problème est survenu lors de la suppression");
    },
  });

  const onSubmit = () => mutate(delUser.id);

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={{
        content: {
          width: "50%",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: { zIndex: "10", backgroundColor: "rgba(160, 160, 160, 0.75)" },
      }}
      ariaHideApp={false}
    >
      <>
        <Typography variant="h4" align="center" sx={{ marginBottom: "10px" }}>
          Êtes-vous sûr de vouloir supprimer cet utilisateur ?
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={6}
          sx={{ marginTop: "20px", marginBottom: "10px" }}
        >
          <LoadingButton
            variant="contained"
            sx={{ width: "15%" }}
            onClick={onSubmit}
            color="success"
            loading={isLoading}
          >
            Valider
          </LoadingButton>
          <Button
            variant="contained"
            sx={{ width: "15%" }}
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Annuler
          </Button>
        </Stack>
      </>
    </Modal>
  );
}

export default DeleteModal;
