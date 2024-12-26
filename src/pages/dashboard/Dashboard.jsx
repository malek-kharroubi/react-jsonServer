import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import AddPublication from "./components/AddPublication";
import axios from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import PubCarte from "./components/PubCarte";

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
          pubTrier.map((publication) => <PubCarte publication={publication} />)}
      </Box>
    </Box>
  );
}
