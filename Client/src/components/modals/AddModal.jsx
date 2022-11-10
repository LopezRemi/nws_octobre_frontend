import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createUser } from "../../service";

function AddModal(props) {
  const { open, setOpen, notify } = props;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      setOpen(false);
      notify("success", "Utilisateur ajouté");
    },
    onError: (error) => {
      var message = "Un problème est survenu lors de l'ajout de l'utilisateur";
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
    const user = getValues("new");
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    mutate(newUser);
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
          Nouvel utilisateur
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              label="Nom"
              margin="normal"
              error={!!errors?.new?.lastName}
              helperText={errors?.new?.lastName?.message}
              {...register("new.lastName", { required: "Champs requis" })}
            />
            <TextField
              label="Prénom"
              margin="normal"
              error={!!errors?.new?.firstName}
              helperText={errors?.new?.firstName?.message}
              {...register("new.firstName", { required: "Champs requis" })}
            />
            <TextField
              label="Email"
              margin="normal"
              error={!!errors?.new?.email}
              helperText={errors?.new?.email?.message}
              {...register("new.email", {
                required: "Champs requis",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Le format n'est pas correct",
                },
              })}
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

export default AddModal;
