import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.passeWord !== data.confirmPasseWord) {
      toast.error("les mots de passe ne correspontdent pas");
    } else {
      axios
        .get(`http://localhost:3000/users?email=${data.email}`)
        .then((res) => {
          if (res.data.length > 0) {
            toast.error("Cette adresse email est déjà utilisée");
          } else {
            axios
              .post("http://localhost:3000/users", data)
              .then((res) => {
                console.log(res);
                toast.success("Inscription réussie");
                navigate("/connection");
              })
              .catch((error) => {
                toast.error("Une erreur est surbenue", error);
              });
          }
        });
    }
  };
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5f5"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h5">Inscription</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="nameId"
              label="Veuillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
              {...register("userName", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 5,
                  message: "Veuillez saisir un nom de plus de 5 caractères",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre adresse mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("email", {
                required: "Veuillez saisir votre adresse mail",
                pattern: "/^[w-.]+@([w-]+.)+[w-]{2,4}$/",
              })}
            />
            <TextField
              id="passId"
              label="Veuillez saisir un mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("passeWord", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez saisir un mot de passe de plus de 6 caractères",
                },
              })}
            />
            <TextField
              id="confirmId"
              label="Veuillez confirmer votre mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("confirmPasseWord", {
                required: "Veuillez confir mer votre mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez saisir un mot de passe de plus de 6 caractères",
                },
              })}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
          >
            Inscription
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
