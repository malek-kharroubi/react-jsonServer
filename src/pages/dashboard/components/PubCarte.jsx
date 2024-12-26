import React from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function PubCarte({ publication }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const useQuery = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/posts/${id}`);
    },
    onError: (error) => {
      toast.error("Une error est survenue", error);
    },
    onSuccess: () => {
      useQuery.invalidateQueries("publications");
      toast.success("Publication supprimée avec succès");
    },
  });
  const deletePublication = (id) => {
    mutation.mutate(id);
  };
  return (
    <Box
      width={"100%"}
      bgcolor={"#fff"}
      borderRadius={4}
      marginBottom={3}
      padding={2}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Avatar src={publication.imageUser} />
        <Typography>{publication.auther}</Typography>
        {user.id === publication.userId && (
          <IconButton
            aria-label="delete"
            onClick={() => deletePublication(publication.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Typography>{publication.textePublication}</Typography>
      <img
        src={publication.imagePublication}
        style={{
          width: "100%",
          borderRadius: 4,
        }}
      />
    </Box>
  );
}
