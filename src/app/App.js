import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

// *Import Components
import Login from "app/view/Login/Login";
import PrivateRoutes from "app/routes/PrivateRoutes";
import useAuth from "./hooks/useAuth";
import Chat from "./view/Chat/Chat";
import { Toaster } from "./components/Ui/Toaster";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E88971",
      contrastText: "#fff",
    },
    secondary: {
      main: "#707070",
      contrastText: "#fff",
    },
  },
  typography: {
    allVariants: {
      color: "#262626",
    },
    fontFamily: "Poppins,sans-serif",
  },
});

function App() {

  const {pathname,search} = window.location
  const [username, setUsername] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [toUserName, setToUserName] = useState(null);
  const [channelID, setChannelID] = useState(null);

  if(pathname === "/" && search){
    localStorage.setItem("search",search)
  }

  const login = (username, chatClient, toUserName, channelID) => {
    setUsername(username);
    setChatClient(chatClient);
    setToUserName(toUserName)
    setChannelID(channelID)
  };
  const { user, verify } = useAuth();

  useEffect(() => {
    verify();
  });


  return (
    <BrowserRouter>
      <Toaster />
      {/* ========== Theme Provider ========== */}

      <ThemeProvider theme={theme}>
        {/* ========== Routes ========== */}
        <Routes>
          <Route element={user ? <Navigate to="/chat" /> : <Outlet />}>
            <Route path="/" element={<Login onLoggedIn={login} />} />
            <Route path={`/?${search}`} element={<Login onLoggedIn={login} />} />
          </Route>

          {/* ========== Private Routes ========== */}
          <Route element={user ? <Outlet /> : <Navigate to="/" />}>
            <Route
              path="/chat"
              element={
                <Chat
                  username={username}
                  chatClient={chatClient}
                  toUserName={toUserName}
                  channelID={channelID}
                />
              }
            />
            {PrivateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
