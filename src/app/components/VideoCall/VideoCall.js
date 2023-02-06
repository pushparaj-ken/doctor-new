import {
  CallEnd,
  Mic,
  PersonAdd,
  Settings,
  Videocam,
} from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import Images from "app/assets/Images";
import colors from "app/style/colors";
import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as SignalWire from "@signalwire/js";
import axios from "axios";
import { SuccessToaster } from "../Ui/Toaster";


const useStyles = makeStyles({
  UserProfile: {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    textAlign: "center",
    paddingRight: "16px",
    paddingLeft: "16px",
  },
});


const SERVERURL = "https://8gv4h.sse.codesandbox.io";

function VideoCall() {

  let currentRoom

  const classes = useStyles();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({});


  const eventLogger = (msg) => { console.log("Event:", msg); }

  async function hangup(room) {
    if (room) {
      await room.hangup()
      room.leave()
      navigate("/chat")
    }
  }

  async function setup_room() {
    let token, room;
    try {
      token = await axios.post(SERVERURL + "/get_token", {
        user_name: searchParams.get("user"),
        room_name: searchParams.get("id"),
        mod: true
      });
      token = token.data.token;

      try {
        try {

          room = await SignalWire.Video.createRoomObject({
            token,
            rootElementId: "stream",
            video:true,
          });
          currentRoom = room
        } catch (e) {
          console.log("🚀 ~ file: VideoCall.js ~ line 73 ~ setup_room ~ e", e)
        }
        room.on("room.joined", async (e) => {
          eventLogger("You have joined the room.");
        });

        room.on("member.joined", async (e) => {
          SuccessToaster(e.member.name + " has joined the room.")
          eventLogger(e.member.name + " has joined the room.");
        });
        room.on("member.left", async () => {
          hangup(room)
        });

        await room.join();

      } catch (error) {
        console.log("🚀 ~ file: VideoCall.js ~ line 90 ~ setup_room ~ error", error)
      }
    } catch (e) {
      console.log(e);
      alert("Error encountered. Please try again.");
    }
  }

  useEffect(() => {
    setup_room();
    var minute = 0;
    var sec = 0;
    const timerCounter = setInterval(function () {
      document.getElementById("timer").innerHTML = minute + " : " + sec;
      sec++;
      if (sec > 59) {
        minute++;
        sec = 0;
      }
    }, 1000);
    return () => clearInterval(timerCounter);
    
  }, []);



  return (

    <Container>
      <Box sx={{ mt: 3, border: `1px solid #f0f0f0` }}>
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center", my: 1 }}
        >
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Grid>
              <img
                className={classes.UserProfile}
                src={Images.doctor1}
                alt="User"
              />
            </Grid>
            <Grid>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {searchParams.get("user")}
              </Typography>
              <Typography variant="body2">Online </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2} md={2}>
            <Settings
              sx={{
                cursor: "pointer",
                fontSize: "34px",
                color: colors.secondaryLight,
                float: "right",
                marginRight: "16px",
              }}
            />
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            height: "600px",
          }}
        >
          {/* <img height="100%" src={Images.doctor2} alt="User Video" /> */}
          {/* below empty div for user video */}
          <div
            id="stream"
            style={{
              width: "100%", height: "100%"
            }}
          >
          </div>
          {/* <Box
            sx={{
              position: "absolute",
              bottom: 20,
              right: 20,
              height: "150px",
              width: "150px",
            }}
          >
            <img
              height="100%"
              width="100%"
              src={Images.doctor3}
              alt="Caller Video"
            />
          </Box> */}
        </Box>
        <Divider />
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={3} md={3} sx={{ pl: 2 }}>
            <Typography id="timer" variant="h4" sx={{ color: colors.ebonyClay }}>
           
            </Typography>
          </Grid>
          <Grid item xs={3} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <Videocam
                sx={{
                  mx: 1,
                  border: `2px solid #ddd`,
                  borderRadius: "50%",
                  p: 2,
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#777",
                }}
              />
              <Mic
                sx={{
                  mx: 1,
                  border: `2px solid #ddd`,
                  borderRadius: "50%",
                  p: 2,
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#777",
                }}
              />
              <PersonAdd
                sx={{
                  mx: 1,
                  border: `2px solid #ddd`,
                  borderRadius: "50%",
                  p: 2,
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#777",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={3} md={3} sx={{ textAlign: "right", pr: 2 }}>
            <CallEnd
             onClick={() => hangup(currentRoom)}
              sx={{
                backgroundColor: colors.beanRed,
                px: 3,
                py: 1,
                fontSize: "30px",
                borderRadius: "24px",
                color: colors.white,
                cursor: "pointer",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default VideoCall;
