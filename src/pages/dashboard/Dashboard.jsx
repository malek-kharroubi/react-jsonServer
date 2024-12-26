import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AddPublication from "./components/AddPublication";
import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/connection");
    }
    // axios.get("http://localhost:3000/posts").then((res) => {
    //   setPublications(res.data);
    // });
  });

  const queryClient = useQueryClient();
  const {
    data: publications,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:3000/posts").then((res) => res.data),
    onerror: (error) => console.log(error),
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  let pubTrier = publications.sort((a, b) => {
    return new Date(b.publicationDate) - new Date(a.publicationDate);
  });
  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar />
      <AddPublication />
      <Box width={"50%"} margin={"auto"} marginTop={4}>
        {publications &&
          pubTrier.map((pub) => (
            <Box
              width={"100%"}
              bgcolor={"#fff"}
              borderRadius={4}
              marginBottom={3}
              padding={2}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Avatar src={pub.imageUser} />
                <Typography>{pub.auther}</Typography>
              </Stack>
              <Typography>{pub.textePublication}</Typography>
              <img
                src={pub.imagePublication}
                style={{
                  width: "100%",
                  borderRadius: 4,
                }}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
