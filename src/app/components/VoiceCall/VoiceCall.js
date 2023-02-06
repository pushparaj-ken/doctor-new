import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as SignalWire from "@signalwire/js";
import { CallEnd, Mic, PersonAdd, Settings, Videocam } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import Images from "app/assets/Images";
import colors from "app/style/colors";
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
  mainUserProfile: {
    borderRadius: "50%",
    width: "180px",
    height: "180px",
    textAlign: "center",
    paddingRight: "16px",
    paddingLeft: "16px",
  },
});


const SERVERURL = "https://8gv4h.sse.codesandbox.io";

function VoiceCall() {

  let currentRoom
  let userStream
  let memberList
   

  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({});


  const eventLogger = (msg) => { console.log("Event:", msg); }

  async function hangup(room) {
    if (room) {
      await room.hangup();
      room.leave()
      navigate("/chat")
    }
  }

async function muteAudio(room) {
    if (room) {
      let memId = localStorage.getItem("memberID")
      await room.audioMute({ memberId: memId });
      // memberList = await room.getMembers()
      // let currentMember = memberList.members.filter((e)=>e.id === memberId)
      // console.log("🚀 ~ file: VoiceCall.js ~ line 63 ~ muteAudio ~ currentMember", currentMember)
      // let obj
      // if(!currentMember[0].audio_muted){
      //   obj = {
      //     ...currentMember[0] , audio_muted:true
      //   }
      // }
      // else{
      //   obj = {
      //     ...currentMember[0] , audio_muted:false
      //   }
      // }
      // let newMemberList = memberList.members.filter((x) => x.id !== memberId);
      // newMemberList.push(obj)
      // memberList.current = newMemberList;
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
            rootElement: document.getElementById("stream"),
            video: false
          });
          currentRoom = room
        } catch (e) {
          console.log('file: VoiceCall.js => line 77 => setup_room => e', e);
        }
        room.on("room.joined", async (e) => {
          eventLogger("You have joined the room.");
        });
        room.on("member.joined", async (e) => {
          SuccessToaster(e.member.name + " has joined the room.")
          eventLogger(e.member.name + " has joined the room.");
          localStorage.setItem("memberID",e.member.id)
        });
        room.on("member.left", async () => {
          hangup(room)
        });

        room.on("member.updated", async (e) => {
        SuccessToaster("member is updated.")
    });
    
    
        await room.join();

      } catch (error) {
        console.log('file: VoiceCall.js => line 86 => setup_room => error', error);
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
      document.getElementById("timer1").innerHTML = minute + " : " + sec;
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
            mt: 3,
          }}
        >
          <div
            id="stream"
            style={{
              width: "100%",
            }}
          >
          </div>
          <img
            height="100%"
            className={classes.mainUserProfile}
            src={Images.doctor2}
            alt="User Voice"
          />
          <Typography
            variant="h5"
            sx={{
              mt: 3,
              color: colors.ebonyClay,
              fontWeight: "bold",
            }}
          >
            {searchParams.get("to")}
          </Typography>
          <Typography
            id="timer"
            variant="h6"
            sx={{
              color: colors.ebonyClay,
              fontWeight: 500,
            }}
          >
          </Typography>
        </Box>
        <Divider />
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={3} md={3} sx={{ pl: 2 }}>
            <Typography variant="h4" id="timer1" sx={{ color: colors.ebonyClay }}>
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
                onClick={()=>muteAudio(currentRoom)}
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
              {/* <PersonAdd
                sx={{
                  mx: 1,
                  border: `2px solid #ddd`,
                  borderRadius: "50%",
                  p: 2,
                  fontSize: "30px",
                  cursor: "pointer",
                  color: "#777",
                }}
              /> */}
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

export default VoiceCall;