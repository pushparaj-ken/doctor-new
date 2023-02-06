import Chat from "../view/Chat/Chat";
import VideoCall from "app/components/VideoCall/VideoCall";
import VoiceCall from "app/components/VoiceCall/VoiceCall";

const PrivateRoutes = [
  {
    path: "/chat",
    component: <Chat />,
  },
  {
    path: "/video-calling",
    component: <VideoCall />,
  },
  {
    path: "/video-calling?",
    component: <VideoCall />,
  },
  {
    path: "/voice-calling",
    component: <VoiceCall />,
  },
  {
    path: "/voice-calling?",
    component: <VoiceCall />,
  },
];

export default PrivateRoutes;
