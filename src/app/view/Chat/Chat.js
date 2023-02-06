import React, { Fragment, useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Grid, IconButton, Input, TextField, Typography } from "@mui/material";
import { ArrowRight, AttachFile, Call, MoreVert, Telegram, Videocam, } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

// * Import Components
import colors from "app/style/colors";
import Images from "app/assets/Images";
import CallingModal from "app/components/CallingModal/CallingModal";
import Sidenav from "app/components/Sidenav.js/Sidenav";


const useStyles = makeStyles({
  chatProfilePic: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  },
  mainChatProfilePic: {
    borderRadius: "50%",
    width: "53px",
    height: "53px",
    alignItems: "center",
  },
  inboxChatImg: {
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    alignItems: "center",
  },
  chatActive: {
    backgroundColor: colors.lightGray,
  },
  hoverChatActive: {
    "&:hover": {
      backgroundColor: colors.lightGray,
    },
  },
  boxHeight: {
    minHeight: "300px",
    maxHeight: `calc(100vh - 330px)`,
    overflowY: "auto",
  },
  textFieldBorderColor: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `1px solid #ced4da`,
        borderRadius: "24px",
      },
      "&:hover fieldset": {
        borderColor: `1px solid #ced4da !important`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `1px solid #ced4da !important`,
      },
    },
  },
});

function Chat({ username, chatClient, toUserName, channelID }) {

  const classes = useStyles();

  const [openCallingModal, setOpenCallingModal] = useState(false);
  const [openDialogType, setOpenDialogType] = useState("");

  const handleCallingModal = (value) => {
    setOpenDialogType(value);
    setOpenCallingModal(!openCallingModal);
  };

  // for input message
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();


  const publishMessage = async (ev) => {
    ev?.preventDefault();
    const content = message.trim();
    if (!content) {
      return;
    }

    await chatClient.publish({
      channel: channelID,
      content,
    });
    setMessage("");
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const keyPress = (ev) => {
    if (ev.key === "Enter" && ev.ctrlKey) {
      publishMessage();
    }
  };


  useEffect(() => {
    const onLoad = async () => {
      if (chatClient === null) {
        localStorage.removeItem("jwt")
        window.location.href = `/${localStorage.getItem("search")}`
      }
      chatClient?.off("message");
      chatClient?.on("message", (message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
      });

      await chatClient?.subscribe([channelID]);

      const messageHistory = await chatClient?.getMessages({
        channel: channelID,
      });

      if (messageHistory?.messages) {
        setMessages(messageHistory.messages.reverse());
      }
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    onLoad()

  }, [chatClient]);

  
  return (
    <Fragment>
      {openCallingModal && (
        <CallingModal
          toUserName={toUserName}
          username={username}
          channelID={channelID}
          openDialogType={openDialogType}
          openCallDialogue={openCallingModal}
          handleCallingDialogue={handleCallingModal}
        />
      )}
      <Box>
        <Grid
          container
          sx={{ my: 7, backgroundColor: colors.whiteSmoke, p: 3 }}
        >
          <Sidenav toUserName={toUserName} />

          <Grid item xs={12} md={8}>
            <Box>
              {/* Main Chat Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 0.55,
                  px: 2,
                  backgroundColor: colors.white,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    {/* Profile Pic */}
                    <img
                      className={classes.mainChatProfilePic}
                      src={Images.doctor2}
                      alt="Doctor Thumbnail"
                    />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: colors.black,
                        textTransform: "capitalize",
                      }}
                    >
                      {toUserName}
                    </Typography>
                    <Typography
                      sx={{ color: colors.textPrimary, fontSize: "14px" }}
                    >
                      Online
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Call
                    onClick={() => handleCallingModal("voice")}
                    sx={{ color: colors.textPrimary, fontSize: "24px", mx: 1 }}
                  />
                  <Videocam
                    onClick={() => handleCallingModal("video")}
                    sx={{ color: colors.textPrimary, fontSize: "24px", mx: 1 }}
                  />
                  <MoreVert
                    sx={{ color: colors.textPrimary, fontSize: "24px", mx: 1 }}
                  />
                </Box>
              </Box>
              <Divider />
              {/* Message Inbox Section */}
              <Box
                className={classes.boxHeight}
                sx={{ backgroundColor: colors.whiteSmoke }}
              >
                {/* Insider of Main Chat Inbox Section */}
                <Box>
                  {/* Designing Sender's Text Field */}
                  {messages.map((m, index) =>
                    m.member.id == username ? (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          my: 2,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            backgroundColor: colors.platinum,
                            p: 2,
                            borderRadius: "6px",
                            mr: 3,
                          }}
                        >
                          <ArrowRight
                            sx={{
                              color: colors.platinum,
                              position: "absolute",
                              right: -21,
                              top: 0,
                              fontSize: "38px",
                            }}
                          />
                          <Box sx={{ textAlign: "center" }}>
                            <div style={{ marginBottom: "5px" }}>
                              {/* At <em>{m.publishedAt.toLocaleString()}</em>{" "} */}
                              {/* {m.member.id} */}
                              sent by me:
                            </div>
                            <span>{m.content}</span>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          my: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            ml: 2,
                            alignItems: "center",
                            // float: "left",
                          }}
                        >
                          {/* <Box>
                            <img
                              src={Images.doctor2}
                              alt="Doctor Thumbnail"
                              className={classes.inboxChatImg}
                            />
                          </Box> */}
                          <Box
                            sx={{
                              position: "relative",
                              backgroundColor: colors.white,
                              p: 2,
                              borderRadius: "6px",
                              mt: 3,
                              ml: 3,
                            }}
                          >
                            <ArrowRight
                              sx={{
                                color: colors.white,
                                position: "absolute",
                                left: -21,
                                top: 0,
                                fontSize: "38px",
                                transform: `rotate(180deg)`,
                              }}
                            />
                            <Box>
                              <div
                                style={{
                                  marginBottom: "5px",
                                  fontSize: "14px",
                                }}
                              >
                                {/* At <em>{m.publishedAt.toLocaleString()}</em>{" "} */}
                                {m.member.id} sent:
                              </div>
                              <span>{m.content}</span>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )
                  )}
                  {/* End Duplicate Boxes */}
                  <div ref={scrollRef}></div>
                </Box>
              </Box>
              {/* Send Message Section */}
              <Typography component={"form"} onSubmit={publishMessage}>
                <Box
                  sx={{
                    backgroundColor: colors.white,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bottom: "0px",
                    px: 2,
                    py: 1.8,
                  }}
                >
                  <label htmlFor="icon-button-file">
                    <Input
                      name="product_img"
                      sx={{ display: "none" }}
                      accept="*"
                      id="icon-button-file"
                      type="file"
                    //   onChange={(e)=>setMessage(e.target.files[0].name)}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"

                    >
                      <AttachFile
                        sx={{
                          fontSize: "28px",
                          color: colors.textSecondary,
                          cursor: "pointer",
                        }}
                      />
                    </IconButton>
                  </label>


                  <TextField
                    value={message}
                    onKeyUp={keyPress}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      backgroundColor: colors.white,
                      borderRadius: "24px",
                      mx: 1.5,
                    }}
                    className={classes.textFieldBorderColor}
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    placeholder="Type Something"
                  />
                  <Button
                    type="submit"
                    startIcon={
                      <Telegram
                        size="medium"
                        sx={{
                          backgroundColor: "#0de0fe",
                          p: 1,
                          borderRadius: "50%",
                          color: colors.white,
                          cursor: "pointer",
                        }}
                      />
                    }
                  ></Button>
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default Chat;
