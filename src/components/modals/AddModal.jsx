import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createMaterial } from "../../service";

function AddModal(props) {
  const { open, setOpen, notify } = props;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createMaterial, {
    onSuccess: () => {
      queryClient.invalidateQueries("allMaterials");
      setOpen(false);
      notify("success", "Matériel ajouté");
    },
    onError: (error) => {
      var message = "Un problème est survenu lors de l'ajout du matériel";
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
    const materiel = getValues("new");
    const newMateriel = {
      name: materiel.name,
      type: materiel.type,
    };
    mutate(newMateriel);
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
          Nouveau Matériel
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
              label="Type"
              margin="normal"
              error={!!errors?.new?.type}
              helperText={errors?.new?.type?.message}
              {...register("new.type", { required: "Champs requis" })}
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
