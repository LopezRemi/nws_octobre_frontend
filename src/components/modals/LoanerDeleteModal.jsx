import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Modal from "react-modal";
import { deleteLoans } from "../../service";
import { fetchAllMaterials } from "../../service";

function LoanerDeleteModal(props) {
  const { open, setOpen, delLoaner, notify } = props;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(deleteLoans, {
    onSuccess: () => {
      queryClient.invalidateQueries("allMaterials");
      setOpen(false);
      notify("success", "Cette emprunt a bien été supprimé");
      fetchAllMaterials()
    },
    onError: () => {
      setOpen(false);
      notify("error", "Un problème est survenu lors de la suppression");
    },
  });

  const onSubmit = () => {
    mutate(delLoaner._id);
  };

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
          Êtes-vous sûr de vouloir supprimer cette emprunt ?
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

export default LoanerDeleteModal;
