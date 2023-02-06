
import Login from "app/view/Login/Login";
import { Navigate } from "react-router-dom";

// *Import Components
import { PageNotFound } from "../components/NotFound/NotFound";

const AppRoutes = [

  {
    path: "/?",
    component: <Login />,
  },
  
  {
    path: "*",
    component: <Navigate to="/404" />,
  },
  {
    path: "/404",
    component: <PageNotFound />,
  },
];

export default AppRoutes;
