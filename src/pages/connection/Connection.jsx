import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Connection() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .get(
        `http://localhost:3000/users?email=${data.email}&password=${data.password}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("user", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("Connexion réussie");
        } else {
          toast.error("Les informations de connexion sont incorrectes");
        }
      });
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
        <Typography variant="h5">Connexion</Typography>
        <form
          style={{
            marginTop: 4,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
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
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
            type="submit"
          >
            Connecter
          </Button>
          <Typography paddingTop={2}>
            Voulez-vous créer un compte?{" "}
            <Link to="/inscription">Cliquez ici</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}
