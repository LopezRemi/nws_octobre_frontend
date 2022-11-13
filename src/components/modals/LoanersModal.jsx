import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createLoaners } from "../../service";

function LoanersModal(props) {
  const { open, setOpen, notify } = props;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createLoaners, {
    onSuccess: () => {
      queryClient.invalidateQueries("");
      setOpen(false);
      notify("success", "Location ajouté");
    },
    onError: (error) => {
      var message = "Un problème est survenu lors de la création de la location";
      switch (error.message) {
        case 409: {
          message = "Cet email est déjà utilisé";
          break;
        }
        default:
      }
      notify("error", message);
    },
  });

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = () => {
    const loaners = getValues("new");
    console.log(loaners)
    const newLoaners = {
      name: loaners.name,
      email: loaners.email,
    };
    mutate(newLoaners);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      onAfterClose={() => unregister("new")}
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
          C'est qui qui loue ?
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              label="Nom"
              margin="normal"
              error={!!errors?.new?.name}
              helperText={errors?.new?.name?.message}
              {...register("new.name", { required: "Champs requis" })}
            />
            <TextField
              label="Email"
              margin="normal"
              error={!!errors?.new?.email}
              helperText={errors?.new?.email?.message}
              {...register("new.email", { required: "Champs requis" })}
            />
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              size="large"
              sx={{ mt: "1.5%" }}
            >
              Valider
            </LoadingButton>
          </Stack>
        </form>
      </>
    </Modal>
  );
}

export default LoanersModal;
