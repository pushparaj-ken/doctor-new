import React, { useEffect } from "react";
import { Box, Typography, } from "@mui/material";
import useAuth from "app/hooks/useAuth";
import axios from "axios";
import { Chat } from "@signalwire/js";
import { useSearchParams } from "react-router-dom";

//* Imported Components
import { Loader } from "app/assets/Images";

function Login({ onLoggedIn }) {

  const [searchParams, setSearchParams] = useSearchParams({});

  const { login } = useAuth()

  const loginInfo = async () => {

    try {
      const apiurl = "https://2u5lf.sse.codesandbox.io/get_chat_token";
      let channelID
      if (searchParams.get("role") === "doctor") {
        channelID = `${searchParams.get("id")}-${searchParams.get("toid")}`
      }
      else {
        channelID = `${searchParams.get("toid")}-${searchParams.get("id")}`
      }
      const reply = await axios.post(
        apiurl,
        { member_id: searchParams.get("name"), channels: [channelID] }
      );
      const chatClient = new Chat.Client({
        token: reply.data.token,
      });
      window.chatClient = chatClient;
      onLoggedIn(searchParams.get("name"), chatClient, searchParams.get("toname"), channelID);
      login(reply.data.token)
    }
    catch (error) {
      console.log("🚀 ~ file: Login.js ~ line 24 ~ loginInfo ~ error", error);
    }
  };

  useEffect(() => {
    loginInfo()
  }, [])


  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Typography variant="h4">Chat Authentication</Typography>
      <Loader />
    </Box>
  );
}

export default Login;
