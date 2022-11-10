import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateUser } from "../../service/";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

function UpdateModal(props) {
  const { open, setOpen, editUser, notify } = props;
  const { register, unregister, handleSubmit, formState } = useForm({
    mode: "onSubmit",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      setOpen(false);
      notify("success", "L'utilisateur a bien été mis à jour");
    },
    onError: () => {
      notify("error", "Un problème est survenu lors de la mise à jour");
    },
  });

  useEffect(() => {
    unregister("update");
  }, [editUser, unregister]);

  const onSubmit = (data) => {
    mutate({ id: editUser.id, user: data.update });
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
          Edition de l'utilisateur
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              name="lastName"
              label="Nom"
              defaultValue={editUser?.lastName}
              margin="normal"
              error={!!formState.errors?.update?.lastName}
              helperText={formState.errors?.update?.lastName?.message}
              {...register("update.lastName", { required: "Champs requis" })}
            />
            <TextField
              label="Prénom"
              defaultValue={editUser?.firstName}
              margin="normal"
              error={!!formState.errors?.update?.firstName}
              helperText={formState.errors?.update?.firstName?.message}
              {...register("update.firstName", { required: "Champs requis" })}
            />
            <TextField
              label="Email"
              defaultValue={editUser?.email}
              margin="normal"
              error={!!formState.errors?.update?.email}
              helperText={formState.errors?.update?.email?.message}
              {...register("update.email", {
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
              Mettre à jour
            </LoadingButton>
          </Stack>
        </form>
      </>
    </Modal>
  );
}

export default UpdateModal;
