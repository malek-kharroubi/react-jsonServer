import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AddPublication from "./components/AddPublication";
import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/connection");
    }
    axios.get("http://localhost:3000/posts").then((res) => {
      setPublications(res.data);
    });
  }, []);

  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar />
      <AddPublication />
      <Box width={"50%"} margin={"auto"}>
        {publications.map((pub) => (
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
