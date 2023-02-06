import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Images from "app/assets/Images";
import { makeStyles } from "@mui/styles";
import colors from "app/style/colors";
import { Call, CallEnd, Videocam } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  chatProfileCallingDialog: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    textAlign: "center",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CallingModal({
  openCallDialogue,
  handleCallingDialogue,
  openDialogType,
  username, toUserName, channelID
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleCallingDialogue}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        sx={{ "& .MuiDialog-paper": { borderRadius: 3, px: 5 } }}
        open={openCallDialogue}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        fullWidth={true}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ textAlign: "center", mt: 4 }}>
          <img
            className={classes.chatProfileCallingDialog}
            src={Images.doctor1}
            alt="Doctor Profile"
          />
          <DialogContentText
            sx={{
              mt: 3,
              color: colors.ebonyClay,
              fontSize: 26,
              fontWeight: "bold",
              textTransform: "capitalize"
            }}
            id="alert-dialog-slide-description"
          >
            {username}
          </DialogContentText>
          <DialogContentText
            sx={{
              mt: 1.5,
              color: colors.ebonyClay,
              fontSize: 18,
            }}
            id="alert-dialog-slide-description"
          >
            Connecting....
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 3 }}>
          <Button onClick={() => handleCallingDialogue()}>
            <CallEnd
              sx={{
                backgroundColor: colors.beanRed,
                fontSize: "34px",
                p: 2,
                color: colors.white,
                borderRadius: "50%",
              }}
            />
          </Button>
          {openDialogType === "voice" ? (
            <Button onClick={() => navigate(`/voice-calling?id=${channelID}&user=${username}&to=${toUserName}`)}>
              <Call
                sx={{
                  backgroundColor: colors.parisGreen,
                  fontSize: "34px",
                  p: 2,
                  color: colors.white,
                  borderRadius: "50%",
                }}
              />
            </Button>
          ) : (
            <Button onClick={() => navigate(`/video-calling?id=${channelID}&user=${username}&to=${toUserName}`)}>
              <Videocam
                sx={{
                  backgroundColor: colors.parisGreen,
                  fontSize: "34px",
                  p: 2,
                  color: colors.white,
                  borderRadius: "50%",
                }}
              />
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
