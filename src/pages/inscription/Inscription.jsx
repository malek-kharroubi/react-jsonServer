import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Inscription() {
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
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir un mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
            />
            <TextField
              id="filled-basic"
              label="Veuillez confirmer votre mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
            />
          </Stack>
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
            }}
          >
            Inscription
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
