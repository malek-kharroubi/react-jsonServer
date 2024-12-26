import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddPublication() {
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const useQuery = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newPub) => {
      return axios.post("http://localhost:3000/posts", newPub);
    },
    onError: (error) => {
      toast.error("Une error est survenue", error);
    },
    onSuccess: () => {
      reset();
      useQuery.invalidateQueries("publications");
      toast.success("Publication ajoutée avec succès");
    },
  });

  const onSubmit = (data) => {
    const publication = {
      ...data,
      userId: user.id,
      publicationDate: new Date(),
      publicationLike: 0,
      auther: user.userName,
    };
    mutation.mutate(publication);
    // axios
    //   .post("http://localhost:3000/posts", publication)
    //   .then((res) => {
    //     console.log(res.data);
    //     toast.success("Publication ajoutée");
    //     reset();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Une erreur est survenue");
    //   });
  };
  return (
    <Stack width={"60%"} margin={"auto"}>
      <h1>Ajouter une publication</h1>
      <form
        style={{
          marginTop: 4,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <TextField
            id="filled-basic"
            label="Parlez nous de votre joutnée"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            multiline
            rows={4}
            {...register("textePublication", {
              required: "Veuillez saisir un texte",
              minLength: {
                value: 10,
                message: "Veuillez saisir un texte de plus de 10 caractères",
              },
            })}
          />
          <TextField
            id="filled-basic"
            label="Saisir l'url de votre image"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            {...register("imagePublication", {
              required: "Veuillez saisir un url",
            })}
          />
          <Button variant="contained" type="submit">
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
