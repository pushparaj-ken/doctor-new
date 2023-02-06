import React from 'react'
import { AddCircleOutline, Search } from '@mui/icons-material'
import { Box, Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';

import colors from 'app/style/colors';
import Images from 'app/assets/Images';

const useStyles = makeStyles({
    chatProfilePic: {
      borderRadius: "50%",
      width: "40px",
      height: "40px",
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

function Sidenav({toUserName}) {

    const classes = useStyles();

  return (
    <Grid
            item
            xs={12}
            md={4}
            sx={{ borderRight: `1px solid ${colors.secondaryLight}` }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                  backgroundColor: colors.white,
                  //   borderRight: `2px solid ${colors.lightGray}`,
                }}
              >
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Chats
                </Typography>
                <AddCircleOutline
                  sx={{ color: colors.black, mr: 3, fontSize: "34px" }}
                />
              </Box>
              <Divider />
              <Box
                sx={{
                  py: 2,
                  px: 2,
                  backgroundColor: colors.whiteSmoke,
                }}
              >
                <TextField
                  sx={{ backgroundColor: colors.white, borderRadius: "24px" }}
                  className={classes.textFieldBorderColor}
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Divider />
              {/* Chat Section */}
              <Box className={classes.boxHeight}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-even",
                    alignItems: "center",
                    px: 2,
                    py: 1.2,
                    backgroundColor: colors.white,
                    cursor: "pointer",
                  }}
                  className={classes.hoverChatActive}
                >
                  <Box>
                    {/* Profile Pic */}
                    <img
                      className={classes.chatProfilePic}
                      src={Images.doctor2}
                      alt="Doctor Thumbnail"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="body1" sx={{textTransform:"capitalize"}}>{toUserName}</Typography>
                      {/* <Typography
                        variant="body2"
                        sx={{ color: colors.textPrimary }}
                      >
                        Hey, How are you ?
                      </Typography> */}
                    </Box>
                    {/* <Box sx={{ textAlign: "center", justifyContent: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.textPrimary }}
                      >
                        2 min ago
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.white,
                          backgroundColor: colors.tealishGreen,
                          borderRadius: "12px",
                          textAlign: "center",
                          width: "35px",
                          m: "auto",
                        }}
                      >
                        15
                      </Typography>
                    </Box> */}
                  </Box>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Grid>
  )
}

export default Sidenav