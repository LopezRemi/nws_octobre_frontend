import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateMaterial } from "../../service/";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

function UpdateModal(props) {
  const { open, setOpen, editMaterial, notify } = props;
  const { register, unregister, handleSubmit, formState } = useForm({
    mode: "onSubmit",
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries("allMaterials");
      setOpen(false);
      notify("success", "le Matériel a bien été mis à jour");
    },
    onError: () => {
      notify("error", "Un problème est survenu lors de la mise à jour");
    },
  });

  useEffect(() => {
    unregister("update");
  }, [editMaterial, unregister]);

  const onSubmit = (data) => {
    mutate({ id: editMaterial._id, material: data.update });
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
          Edition du Matériel
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField
              name="name"
              label="Nom"
              defaultValue={editMaterial?.name}
              margin="normal"
              error={!!formState.errors?.update?.name}
              helperText={formState.errors?.update?.name?.message}
              {...register("update.name", { required: "Champs requis" })}
            />
            <TextField
              label="type"
              defaultValue={editMaterial?.type}
              margin="normal"
              error={!!formState.errors?.update?.type}
              helperText={formState.errors?.update?.type?.message}
              {...register("update.type", { required: "Champs requis" })}
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
